/*
 * @Author: czy0729
 * @Date: 2024-09-27 03:37:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-04 17:41:47
 */
import React from 'react'
import { View } from 'react-native'
import { ActionSheet, Avatar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Fn, ReactNode } from '@types'
import { Ctx } from '../../types'
import Comments from './comments'
import Subjects from './subjects'
import {
  ACTION_SHEET_HEIGHT_LG,
  ACTION_SHEET_HEIGHT_MD,
  ACTION_SHEET_HEIGHT_SM,
  COMPONENT,
  NUM_COLUMNS
} from './ds'

function SelectedList(_props, { $, navigation }: Ctx) {
  const isCollection = !!$.userId
  let titleLeft: ReactNode
  let handleTitle: Fn
  if (isCollection) {
    if ($.state.cutType === '标签') {
      handleTitle = () => {
        navigation.push('Tag', {
          type: $.state.subjectType,
          tag: $.state.title
        })

        t('词云.跳转', {
          to: 'Tag',
          type: $.state.subjectType,
          tag: $.state.title
        })
      }
    } else if ($.selectedMono) {
      const { image, id, actorId, name, nameJP } = $.selectedMono
      handleTitle = () => {
        const monoId = `person/${actorId || id}` as const
        navigation.push('Mono', {
          monoId,
          _name: name,
          _jp: nameJP,
          _image: image
        })

        t('词云.跳转', {
          to: 'Mono',
          monoId
        })
      }
      if (image && typeof image === 'string') {
        titleLeft = (
          <View style={_.mr.sm}>
            <Avatar
              src={image}
              size={24}
              radius={0}
              skeleton={false}
              placeholder={false}
              onPress={handleTitle}
            />
          </View>
        )
      }
    }
  }

  const length = isCollection ? $.selectedSubjects.length : $.selectedComment.length
  let height = ACTION_SHEET_HEIGHT_LG
  if (isCollection) {
    if (length <= NUM_COLUMNS) {
      height = Math.floor(ACTION_SHEET_HEIGHT_SM / 1.2)
    } else if (length <= NUM_COLUMNS * 2) {
      height = Math.floor(ACTION_SHEET_HEIGHT_MD / 1.2)
    }
  } else {
    if (length <= 2) {
      height = ACTION_SHEET_HEIGHT_SM
    } else if (length <= 4) {
      height = ACTION_SHEET_HEIGHT_MD
    }
  }

  return (
    <ActionSheet
      show={$.state.show}
      title={`${$.state.title} (${length})`}
      titleLeft={titleLeft}
      height={height}
      scrollEnabled={!isCollection}
      usePortal={false}
      onTitlePress={handleTitle}
      onClose={$.onClose}
    >
      {isCollection ? <Subjects /> : <Comments />}
    </ActionSheet>
  )
}

export default obc(SelectedList, COMPONENT)
