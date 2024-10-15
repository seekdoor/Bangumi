/*
 * @Author: czy0729
 * @Date: 2020-03-22 15:37:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-15 04:49:40
 */
import React from 'react'
import { View } from 'react-native'
import { Component, Cover, Flex, Text, Touchable } from '@components'
import { _, discoveryStore } from '@stores'
import { findSubjectCn, HTMLDecode, stl } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { EVENT, IMG_HEIGHT_SM, IMG_WIDTH_SM } from '@constants'
import BtnPopover from './btn-popover'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Ctx, Props as ItemBlogProps } from './types'

export { ItemBlogProps }

export const ItemBlog = obc(
  (
    {
      style,
      id,
      cover,
      title,
      content,
      username,
      subject,
      typeCn,
      time,
      replies,
      tags = [],
      event = EVENT
    }: ItemBlogProps,
    { navigation }: Ctx
  ) => {
    const styles = memoStyles()
    const readed = discoveryStore.blogReaded(id)
    const line = []
    if (username) line.push(username)
    if (subject) line.push(findSubjectCn(subject, id))
    if (time) line.push(time)

    const handlePress = () => {
      const { id: eventId, data: eventData } = event
      t(eventId, {
        to: 'Blog',
        blogId: id,
        ...eventData
      })

      discoveryStore.updateBlogReaded(id)
      navigation.push('Blog', {
        blogId: id,
        _title: title
      })
    }

    return (
      <Component id='item-blog' data-key={id}>
        <View style={stl(styles.container, style, readed && styles.readed)}>
          <Flex style={styles.wrap} align='start'>
            {!!cover && (
              <View style={styles.imgContainer}>
                <Cover
                  src={cover}
                  width={IMG_WIDTH_SM}
                  height={IMG_HEIGHT_SM}
                  radius
                  type={typeCn}
                />
              </View>
            )}
            <Flex.Item>
              <Flex align='start'>
                <Flex.Item>
                  <Touchable onPress={handlePress}>
                    <Text size={14} numberOfLines={2} bold>
                      {HTMLDecode(title)}
                      {replies !== '+0' && (
                        <Text size={12} type='main' lineHeight={14} bold>
                          {'  '}
                          {replies}
                        </Text>
                      )}
                    </Text>
                    {!!line.length && (
                      <Text style={_.mt.xs} type='sub' size={12} bold>
                        {HTMLDecode(line.join(' · '))}
                      </Text>
                    )}
                  </Touchable>
                </Flex.Item>
                <BtnPopover id={id} title={title} />
              </Flex>
              <Touchable style={_.mt.sm} onPress={handlePress}>
                <Text size={13} lineHeight={15} numberOfLines={4}>
                  {HTMLDecode(content)}
                </Text>
              </Touchable>
              {!!tags.length && (
                <Flex style={_.mt.md}>
                  <Flex.Item />
                  <Text style={stl(styles.tags, readed && styles.tagsBorder)} size={13}>
                    tags: {typeof tags === 'string' ? tags : tags.join(' ')}
                  </Text>
                </Flex>
              )}
            </Flex.Item>
          </Flex>
        </View>
      </Component>
    )
  },
  COMPONENT
)

export default ItemBlog
