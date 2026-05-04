/*
 * @Author: czy0729
 * @Date: 2022-09-03 17:28:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-02 11:04:06
 */
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Button as ButtonComp, Menu, Popover } from '@components'
import { _, systemStore } from '@stores'
import { FROZEN_ARRAY, FROZEN_FN, FROZEN_OBJECT, IOS, WSA } from '@constants'
import FlipButton from '../flip-button'
import { getComment, getPopoverData, getType } from './utils'
import { memoStyles } from './styles'

function Button({
  props = {
    width: 0,
    margin: 0,
    subjectId: 0,
    numbersOfLine: 8,
    canPlay: false,
    login: false,
    advance: false,
    userProgress: FROZEN_OBJECT,
    flip: false,
    onFliped: FROZEN_FN,
    onSelect: FROZEN_FN,
    onLongPress: FROZEN_FN
  },
  item = FROZEN_OBJECT as any,
  eps = FROZEN_ARRAY,
  epStatus = '',
  isSp = false,
  num = 0
}) {
  const styles = memoStyles()

  // --- Data Logic ---
  const { heatMap } = systemStore.setting
  const {
    subjectId,
    width,
    margin,
    numbersOfLine,
    canPlay,
    login,
    advance,
    userProgress,
    flip,
    onFliped,
    onSelect
  } = props

  const type = getType(userProgress[item.id], item.status)
  const isSide = num % numbersOfLine === 0

  const containerStyle = {
    marginBottom: margin - 4
  }
  const itemStyle = {
    marginRight: !_.isLandscape && !_.isPad && !WSA && isSide ? 0 : margin,
    marginBottom: 6
  }
  const btnPassProps = {
    style: {
      width,
      height: width
    },
    styleText: type === 'dropped' && styles.textThrough,
    type
  } as const

  // --- Memos ---
  const memoPopoverData = useMemo(
    () => getPopoverData(item, isSp, canPlay, login, advance, userProgress, epStatus),
    [item, isSp, canPlay, login, advance, userProgress, epStatus]
  )

  // 弹出层属性
  const popoverProps = IOS
    ? {
        overlay: (
          <Menu
            title={[[`ep${item.sort}`, item.airdate || item.duration].filter(i => !!i).join(' · ')]}
            data={memoPopoverData}
            onSelect={value => onSelect(value, item)}
          />
        )
      }
    : {
        data: memoPopoverData,
        date: item.airdate || item.duration,
        onSelect: (value: string) => onSelect(value, item, subjectId)
      }

  // --- Memos (Elements) ---
  const elHeatMap = useMemo(() => {
    if (!heatMap) return null

    const { min, max } = getComment(eps)
    return (
      <View
        style={[
          styles.bar,
          {
            /** 1.68 是比率, 增大少回复与高回复的透明度幅度 */
            opacity: (item.comment - min / 1.68) / max
          }
        ]}
      />
    )
  }, [heatMap, eps, item.comment, styles.bar])

  // --- Render ---
  return (
    <View style={containerStyle}>
      {flip && <View style={styles.flip} />}
      <View style={itemStyle}>
        {flip ? (
          <View>
            <FlipButton {...btnPassProps} text={item.sort} onAnimated={onFliped} />
            {elHeatMap}
          </View>
        ) : (
          <Popover {...popoverProps}>
            <ButtonComp {...btnPassProps} size='sm' animate={false}>
              {String(item.sort)}
            </ButtonComp>
            {elHeatMap}
          </Popover>
        )}
      </View>
    </View>
  )
}

export default observer(Button)
