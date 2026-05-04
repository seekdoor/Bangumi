/*
 * @Author: czy0729
 * @Date: 2022-08-31 14:21:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-02 11:02:30
 */
import React, { useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { arrGroup, asc, postTask } from '@utils'
import { memo } from '@utils/decorators'
import { FROZEN_ARRAY, FROZEN_FN, FROZEN_OBJECT, MODEL_EP_TYPE, WSA } from '@constants'
import Carousel from './carousel'
import NormalButtons from './normal-buttons'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

import type { LayoutChangeEvent } from 'react-native'
import type { EpTypeCn } from '@types'
import type { Props } from './types'

export default memo(
  ({
    style,
    advance = false,
    canPlay = false,
    eps = FROZEN_ARRAY,
    grid = false,
    layoutWidth = 0,
    lines = 4,
    login = false,
    marginRight = 0,
    numbersOfLine = DEFAULT_PROPS.numbersOfLine,
    pagination = false,
    subjectId = 0,
    userProgress = FROZEN_OBJECT,
    orientation = _.orientation,
    flip = false,
    onFliped = FROZEN_FN,
    onSelect = FROZEN_FN
  }: Props) => {
    // --- Data Logic ---
    const [width, setWidth] = useState(layoutWidth - marginRight)

    // --- Memos ---
    const memoBtnStyle = useMemo(() => {
      if (WSA || _.isPad) {
        return {
          width: 40,
          margin: _.sm
        }
      }

      if (!width) return {}

      const marginPercent = 0.2
      const marginNumbers = numbersOfLine - 1
      const marginSum = width * marginPercent
      const widthSum = width - marginSum
      const itemWidth = widthSum / numbersOfLine
      const itemMargin = marginSum / marginNumbers

      return {
        width: grid ? Math.floor(itemWidth) : itemWidth,
        margin: grid ? Math.floor(itemMargin) : itemMargin
      }
    }, [width, numbersOfLine, grid])

    const memoPassProps = useMemo(() => {
      const { width: btnWidth, margin: btnMargin } = memoBtnStyle

      return {
        advance,
        canPlay,
        login,
        margin: btnMargin,
        numbersOfLine,
        subjectId,
        userProgress,
        width: btnWidth,
        flip,
        onFliped,
        onSelect
      }
    }, [
      advance,
      memoBtnStyle,
      canPlay,
      login,
      numbersOfLine,
      subjectId,
      userProgress,
      flip,
      onFliped,
      onSelect
    ])

    const memoPages = useMemo(() => {
      let epsData = eps || []

      /** 是否有 SP */
      const hasSp = epsData.some(item => item.type == 1)
      if (hasSp) {
        // 保证 SP 排在普通章节后面
        epsData = epsData
          .slice()
          // 后来发现会有 2 的情况, 是 OP 或 ED, 暂时排除掉
          .filter(item => item.type === 0 || item.type === 1)
          .sort((a, b) =>
            asc(a, b, item =>
              MODEL_EP_TYPE.getLabel<EpTypeCn>(String(item.type)) === '普通' ? 1 : 0
            )
          )
      }

      // SP 可能会占用一格, 若 eps 当中存在 sp, 每组要减 1 项避免换行
      const arrNum = numbersOfLine * lines - (lines <= 3 ? 0 : advance && hasSp ? 1 : 0)
      return arrGroup(epsData, arrNum)
    }, [eps, numbersOfLine, lines, advance])

    // --- Handlers ---
    const handleLayout = useCallback(
      (event: LayoutChangeEvent) => {
        if (layoutWidth) return

        const { width: layoutWidthVal } = event.nativeEvent.layout
        postTask(() => {
          setWidth(layoutWidthVal - marginRight)
        }, 0)
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [orientation, layoutWidth, marginRight]
    )

    // --- Render ---
    if (!memoPages.length) return null

    const mounted = width !== 0
    const layoutStyle = mounted
      ? [
          style,
          {
            marginRight: -memoBtnStyle.margin
          }
        ]
      : undefined

    if (pagination) {
      return (
        <View style={layoutStyle} onLayout={handleLayout}>
          {mounted ? (
            memoPages.length <= 1 ? (
              <NormalButtons props={memoPassProps} eps={memoPages[0]} />
            ) : (
              <Carousel props={memoPassProps} epsGroup={memoPages} />
            )
          ) : null}
        </View>
      )
    }

    const { margin } = memoBtnStyle
    const marginStyle = {
      marginBottom: margin ? -margin : 0 // 抵消最后一行的 marginBottom
    }

    return (
      <View style={[layoutStyle, marginStyle]} onLayout={handleLayout}>
        {mounted && <NormalButtons props={memoPassProps} eps={memoPages[0]} />}
      </View>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)
