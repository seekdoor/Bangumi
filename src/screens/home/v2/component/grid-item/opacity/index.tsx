/*
 * @Author: czy0729
 * @Date: 2022-11-21 02:56:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-12 17:20:36
 */
import React from 'react'
import { View } from 'react-native'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Opacity({ subjectId, children }, { $ }: Ctx) {
  const { subject_id: current } = $.state.grid || {}
  const isActive = current === subjectId
  return <View style={isActive && styles.active}>{children}</View>
}

export default obc(Opacity, COMPONENT)
