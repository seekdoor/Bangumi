/*
 * @Author: czy0729
 * @Date: 2024-09-28 16:32:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-28 16:51:37
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { WEB } from '@constants'
import { ReactNode } from '@types'
import { Ctx } from '../../types'
import Mono from './mono'
import Subject from './subject'
import Topic from './topic'
import { COMPONENT } from './ds'

function Media(_props, { $, navigation }: Ctx) {
  let el: ReactNode
  if ($.subjectId) {
    el = <Subject />
  } else if ($.topicId) {
    el = <Topic />
  } else if ($.monoId) {
    el = <Mono />
  }
  if (!el) return null

  if (WEB) {
    el = (
      <Touchable
        onPress={() => {
          if ($.subjectId) {
            navigation.push('Subject', {
              subjectId: $.subjectId
            })
            return
          }

          if ($.topicId) {
            navigation.push('Topic', {
              topicId: $.topicId
            })
            return
          }

          if ($.monoId) {
            navigation.push('Mono', {
              monoId: $.monoId
            })
            return
          }
        }}
      >
        {el}
      </Touchable>
    )
  }

  return <View style={_.container.wind}>{el}</View>
}

export default obc(Media, COMPONENT)
