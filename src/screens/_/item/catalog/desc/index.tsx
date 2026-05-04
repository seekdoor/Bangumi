/*
 * @Author: czy0729
 * @Date: 2024-08-21 18:41:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-11 05:28:36
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Avatar, Flex, Text, UserStatus } from '@components'
import { InView } from '@_/base'
import { _ } from '@stores'
import { useNavigation } from '@utils/hooks'
import { AVATAR_WIDTH, ITEM_HEIGHT } from '../ds'

function Desc({ index, userId, avatar, name, date, event }) {
  const navigation = useNavigation()

  return (
    <Flex style={_.mt.md}>
      <InView style={_.mr.sm} y={InView.y(index - 1, ITEM_HEIGHT, ITEM_HEIGHT / 2)}>
        <UserStatus userId={userId} mini>
          <Avatar
            key={avatar}
            navigation={navigation}
            size={AVATAR_WIDTH}
            userId={userId}
            name={name}
            src={avatar}
            radius={_.radiusXs}
            event={event}
          />
        </UserStatus>
      </InView>

      <Flex.Item>
        {!!name && (
          <Text size={12} bold numberOfLines={1}>
            {name}
          </Text>
        )}
        {!!date && (
          <Text size={10} lineHeight={11} type='sub'>
            {date}
          </Text>
        )}
      </Flex.Item>
    </Flex>
  )
}

export default observer(Desc)
