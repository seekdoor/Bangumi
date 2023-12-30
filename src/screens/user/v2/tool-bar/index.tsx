/*
 * @Author: czy0729
 * @Date: 2019-05-26 02:46:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-30 12:46:20
 */
import React from 'react'
import { View } from 'react-native'
import { ToolBar as CompToolBar } from '@components'
import { systemStore } from '@stores'
import { stl } from '@utils'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import Filter from '../filter'
import { Ctx } from '../types'
import Sort from './sort'
import Tag from './tag'
import Pagination from './pagination'
import Search from './search'
import More from './more'
import { memoStyles } from './styles'

function ToolBar(
  { page, pageCurrent, pageTotal, onRefreshOffset = undefined },
  { $ }: Ctx
) {
  rerender('User.ToolBar')

  const styles = memoStyles()
  const { list } = $.state
  const { userPagination } = systemStore.setting
  return (
    <View style={stl(styles.container, list && styles.list)}>
      <CompToolBar>
        <Sort />
        <Tag page={page} />
        {userPagination && (
          <Pagination pageCurrent={pageCurrent} pageTotal={pageTotal} />
        )}
        <Search />
        <More
          onRefreshOffset={() => {
            if (typeof onRefreshOffset === 'function') onRefreshOffset()
            $.onRefreshOffset()
          }}
        />
      </CompToolBar>
      <Filter page={page} />
    </View>
  )
}

export default obc(ToolBar)
