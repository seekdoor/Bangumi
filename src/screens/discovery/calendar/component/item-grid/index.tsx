/*
 * @Author: czy0729
 * @Date: 2019-03-22 09:17:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 01:20:19
 */
import React from 'react'
import { collectionStore, systemStore, useStore } from '@stores'
import { getOnAirItem } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Item from './item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function ItemGridWrap({ subjectId, name, images, score, time }) {
  const { $, navigation } = useStore<Ctx>()
  const collection = collectionStore.collect(subjectId)
  if ($.state.type === 'collect' && !collection) return null

  const { origin = '', tag = '' } = getOnAirItem(subjectId)
  if (
    ($.state.origin && !origin?.includes($.state.origin)) ||
    ($.state.tag && !tag?.includes($.state.tag))
  ) {
    return null
  }

  return (
    <Item
      navigation={navigation}
      styles={memoStyles()}
      hideScore={systemStore.setting.hideScore}
      subjectId={subjectId}
      name={name}
      image={images?.medium}
      score={score}
      collection={collection}
      time={time}
    />
  )
}

export default ob(ItemGridWrap, COMPONENT)
