/*
 * @Author: czy0729
 * @Date: 2021-03-03 22:55:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-07 17:15:45
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { HTMLDecode } from '@utils'
import { ob } from '@utils/decorators'
import Rank from '../../rank'

function Title({ rank, name = '', level, cLevel, crown }) {
  const lv = cLevel || level || 0
  return (
    <Flex wrap='wrap'>
      <Rank value={rank} />
      <Text
        type='tinygrailPlain'
        size={name.length > 12 ? 10 : name.length > 8 ? 12 : 14}
        lineHeight={14}
        bold
      >
        {HTMLDecode(name)}
      </Text>
      {parseInt(lv) > 1 && (
        <Text style={_.ml.xs} type='ask' size={11} lineHeight={14} bold>
          lv{lv}
        </Text>
      )}
      {!!crown && (
        <Text style={_.ml.xs} type='warning' size={11} lineHeight={14} bold>
          x{crown}
        </Text>
      )}
    </Flex>
  )
}

export default ob(Title)
