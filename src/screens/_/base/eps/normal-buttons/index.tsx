/*
 * @Author: czy0729
 * @Date: 2021-08-05 16:47:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-02 11:57:40
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex } from '@components'
import { subjectStore } from '@stores'
import { MODEL_EP_TYPE } from '@constants'
import Button from '../button'
import SpButtons from '../sp-buttons'
import TimelineAvatars from '../timeline-avatars'

function NormalButtons({ props, eps }) {
  const itemsNormal = []
  const itemsSp = []
  eps.forEach((item: { type: any }) => {
    const label = MODEL_EP_TYPE.getLabel(item.type)
    if (label === '普通') {
      itemsSp.push(item)
    } else if (label === 'SP') {
      itemsNormal.push(item)
    }
  })

  return (
    <Flex wrap='wrap' align='start'>
      {itemsNormal.map((item, index) => {
        const num = index + 1
        const isSide = num % props.numbersOfLine === 0

        return (
          <View key={item.id}>
            <TimelineAvatars subjectId={props.subjectId} sort={index + 1} isSide={isSide} />
            <Button
              props={props}
              item={item}
              eps={eps}
              epStatus={subjectStore.epStatus(item.id)}
              num={num}
            />
          </View>
        )
      })}

      <SpButtons props={props} eps={itemsSp} preNum={itemsNormal.length} />
    </Flex>
  )
}

export default observer(NormalButtons)
