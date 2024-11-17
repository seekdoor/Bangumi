/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:53:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 01:22:11
 */
import React from 'react'
import { ListView } from '@components'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { renderItem, renderSectionHeader } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function List() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const numColumns = $.isList ? undefined : 3
  return (
    <ListView
      key={`${$.state.layout}${numColumns}`}
      style={_.mt._sm}
      contentContainerStyle={styles.contentContainerStyle}
      keyExtractor={keyExtractor}
      sections={$.sections}
      lazy={2}
      numColumns={numColumns}
      // scrollToTop
      renderSectionHeader={renderSectionHeader}
      renderItem={renderItem}
      scrollEventThrottle={16}
      onScroll={$.onScroll}
    />
  )
}

export default ob(List, COMPONENT)
