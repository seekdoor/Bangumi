/*
 * @Author: czy0729
 * @Date: 2019-04-08 10:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-18 08:27:09
 */
import React from 'react'
import { View } from 'react-native'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { TITLE_RELATIONS } from '../../ds'
import { Ctx } from '../../types'
import Relations from './relations.lazy'
import { COMPONENT } from './ds'

function RelationsWrap({ onBlockRef }, { $, navigation }: Ctx) {
  if (!$.showRelations[1]) return null

  return (
    <>
      <View style={_.container.layout} ref={ref => onBlockRef(ref, TITLE_RELATIONS)} />
      <Relations
        navigation={navigation}
        showRelations={systemStore.setting.showRelations}
        subjectId={$.subjectId}
        relations={$.relations}
        typeCn={$.type}
        onSwitchBlock={$.onSwitchBlock}
      />
    </>
  )
}

export default obc(RelationsWrap, COMPONENT)
