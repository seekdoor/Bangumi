/*
 * @Author: czy0729
 * @Date: 2022-11-24 19:20:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-09 15:26:06
 */
import React from 'react'
import { Cover, Flex, Heatmap, Squircle, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { _ } from '@stores'
import { x18 } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { IMG_DEFAULT } from '@constants'
import { Ctx } from '../../../types'
import { COVER_HEIGHT, COVER_WIDTH } from '../ds'
import { memoStyles } from './styles'

function Item({ from, data }, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const _from = `系列${from}`
  return (
    <Touchable
      style={styles.touch}
      animate
      scale={0.9}
      onPress={() => {
        t('条目.跳转', {
          to: 'Subject',
          from: _from,
          subjectId: $.subjectId
        })

        navigation.push('Subject', {
          subjectId: data.id,
          _jp: data.title,
          _image: getCoverSrc(data.image, COVER_WIDTH)
        })
      }}
    >
      <Flex>
        <Squircle width={COVER_WIDTH} height={COVER_HEIGHT} radius={4}>
          <Cover
            src={data.image || IMG_DEFAULT}
            size={COVER_WIDTH}
            height={COVER_HEIGHT}
            cdn={!x18($.subjectId)}
            fadeDuration={0}
            skeleton={false}
            noDefault
          />
        </Squircle>
        <Text style={_.ml.sm} size={11}>
          {data.type || from}
        </Text>
      </Flex>
      <Heatmap right={-19} id='条目.跳转' from={_from} />
    </Touchable>
  )
}

export default obc(Item)
