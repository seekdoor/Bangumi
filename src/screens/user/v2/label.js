/*
 * @Author: czy0729
 * @Date: 2021-11-27 17:23:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-27 17:26:10
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

function Label({ title, focused }, { $ }) {
  rerender('User.Label')

  const { subjectType } = $.state
  const count = $.counts[MODEL_SUBJECT_TYPE.getTitle(subjectType)][title]
  return (
    <Flex style={_.container.block} justify='center' align='start'>
      <Text type='title' size={13} bold={focused}>
        {title.replace('看', $.action)}
      </Text>
      {!!count && (
        <Text type='sub' size={9} lineHeight={11} bold>
          {' '}
          {count}{' '}
        </Text>
      )}
    </Flex>
  )
}

export default obc(Label)