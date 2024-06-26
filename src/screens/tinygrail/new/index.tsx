/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:12:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 16:22:14
 */
import React from 'react'
import { Header, Page } from '@components'
import { _ } from '@stores'
import { inject, obc } from '@utils/decorators'
import IconGo from '@tinygrail/_/icon-go'
import Tabs from '@tinygrail/_/tabs-v2'
import ToolBar from '@tinygrail/_/tool-bar'
import { SORT_DS } from '@tinygrail/overview/ds'
import List from './list'
import Store from './store'
import { TABS } from './ds'
import { Ctx } from './types'

/** 新番榜单 */
class TinygrailNew extends React.Component {
  componentDidMount() {
    const { $ } = this.context as Ctx
    $.init()
  }

  renderContentHeaderComponent() {
    const { $ } = this.context as Ctx
    const { level, sort, direction } = $.state
    return (
      <ToolBar
        data={SORT_DS}
        level={level}
        levelMap={$.levelMap}
        sort={sort}
        direction={direction}
        onLevelSelect={$.onLevelSelect}
        onSortPress={$.onSortPress}
      />
    )
  }

  render() {
    const { $ } = this.context as Ctx
    const { _loaded } = $.state
    return (
      <>
        <Header
          title='新番榜单'
          hm={['tinygrail/new', 'TinygrailNew']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
          headerRight={() => <IconGo $={$} />}
        />
        <Page style={_.container.tinygrail} loaded={_loaded}>
          <Tabs
            routes={TABS}
            renderContentHeaderComponent={this.renderContentHeaderComponent()}
            renderItem={item => <List key={item.key} id={item.key} />}
          />
        </Page>
      </>
    )
  }
}

export default inject(Store)(obc(TinygrailNew))
