/*
 * @Author: czy0729
 * @Date: 2022-04-24 15:29:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 16:13:04
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Item from './item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

export default obc(({ item }, { $, navigation }: Ctx) => {
  const { subjectId } = item

  // 隐藏未匹配
  if ($.state.hideNotMatched && !subjectId) return null

  // 隐藏已看过
  const collection = $.collection(subjectId)
  if ($.state.hideWatched && collection?.status === 'collect') return null

  return (
    <Item
      navigation={navigation}
      styles={memoStyles()}
      item={item}
      review={$.review(item.id)}
      collection={collection}
      hideSame={$.state.hideSame}
      onRefreshCollection={$.onRefreshCollection}
      onBottom={$.onBottom}
      onSubmit={$.onSubmit}
    />
  )
}, COMPONENT)