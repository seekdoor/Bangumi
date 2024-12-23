/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 06:41:15
 */
import { computed, observable } from 'mobx'
import { tinygrailStore } from '@stores'
import { t } from '@utils/fetch'
import store from '@utils/store'
import { feedback, info } from '@utils/ui'
import { levelList, relation, sortList, throttleInfo } from '@tinygrail/_/utils'
import { Id } from '@types'
import { EXCLUDE_STATE, tabs } from './ds'
import { Params, TabsKeys } from './types'

export default class ScreenTinygrailBid extends store<typeof EXCLUDE_STATE> {
  params: Params

  state = observable({
    page: 0,
    level: '',
    sort: '',
    direction: '' as '' | 'up' | 'down',
    _loaded: false
  })

  init = async () => {
    const { type } = this.params
    const page = tabs.findIndex(item => item.key === type)
    this.setState({
      page,
      _loaded: true
    })
    this.fetchList(this.currentKey)
  }

  // -------------------- fetch --------------------
  fetchList = (key?: TabsKeys) => {
    if (key === 'bid') return tinygrailStore.fetchBid()
    if (key === 'asks') return tinygrailStore.fetchAsks()
    return tinygrailStore.fetchAuction()
  }

  // -------------------- get --------------------
  @computed get currentKey() {
    const { page } = this.state
    return tabs[page].key
  }

  @computed get currentTitle() {
    const { page } = this.state
    return tabs[page].title.replace('我的', '')
  }

  @computed get canCancelCount() {
    if (this.currentTitle === '拍卖') {
      return this.computedList(this.currentKey).list.filter(item => item.state === 0).length
    }
    return this.computedList(this.currentKey).list.length
  }

  @computed get levelMap() {
    const { list } = this.list(this.currentKey)
    const data = {}
    list.forEach(item =>
      data[item.level || 1] ? (data[item.level || 1] += 1) : (data[item.level || 1] = 1)
    )
    return data
  }

  list(key: TabsKeys = 'bid') {
    return computed(() => relation(tinygrailStore.list(key))).get()
  }

  computedList(key: TabsKeys) {
    const { sort, level, direction } = this.state
    return computed(() => {
      const list = this.list(key)
      if (!list._loaded) return list

      let _list = list
      if (level) {
        _list = {
          ..._list,
          list: levelList(level, _list.list)
        }
      }

      if (sort) {
        _list = {
          ..._list,
          list: sortList(sort, direction, _list.list)
        }
      }

      return _list
    }).get()
  }

  // -------------------- page --------------------
  onChange = (page: number) => {
    if (page === this.state.page) return

    t('我的委托.标签页切换', {
      page
    })

    this.setState({
      page,
      sort: '',
      direction: ''
    })
    this.tabChangeCallback(page)
  }

  tabChangeCallback = (page: number) => {
    const { key } = tabs[page]
    const { _loaded } = this.list(key)
    if (!_loaded) this.fetchList(key)
  }

  onLevelSelect = (level: any) => {
    this.setState({
      level
    })
  }

  onSortPress = (item: string) => {
    const { sort, direction } = this.state
    if (item === sort) {
      let nextSort = item
      let nextDirection = 'down'
      if (direction === 'down') {
        nextDirection = 'up'
      } else if (direction === 'up') {
        nextSort = ''
        nextDirection = ''
      }

      t('我的委托.排序', {
        sort: nextSort,
        direction: nextDirection
      })

      this.setState({
        sort: nextSort,
        direction: nextDirection
      })
    } else {
      t('我的委托.排序', {
        sort: item,
        direction: 'down'
      })

      this.setState({
        sort: item,
        direction: 'down'
      })
    }
  }

  onBatchCancel = () => {
    if (this.currentKey === 'asks' || this.currentKey === 'bid') {
      this.doCancelAllBid()
    } else {
      this.doCancelAllAuction()
    }
  }

  // -------------------- action --------------------
  doAuctionCancel = async (id: Id) => {
    if (!id) return

    t('我的委托.取消拍卖', {
      id
    })

    const result = await tinygrailStore.doAuctionCancel({
      id
    })
    feedback()

    if (!result) {
      info('取消失败')
      return
    }

    info('已取消')
    this.fetchList()
  }

  doCancelAllBid = async () => {
    const { list } = this.computedList(this.currentKey)
    t('我的委托.一键取消', {
      length: list.length
    })

    for (const item of list) {
      throttleInfo(`${list.findIndex((i: { id: any }) => item.id === i.id) + 1} / ${list.length}`)

      // 请求角色挂单信息
      const logs = await tinygrailStore.fetchUserLogs(item.id)
      if (this.currentKey === 'asks') {
        // 取消卖单
        for (const ask of logs.asks) {
          await tinygrailStore.doCancelAsk({
            id: ask.id
          })
        }
      } else if (this.currentKey === 'bid') {
        // 取消买单
        for (const bid of logs.bids) {
          await tinygrailStore.doCancelBid({
            id: bid.id
          })
        }
      }
    }
    feedback()

    await this.fetchList(this.currentKey)
    info('操作完成')
  }

  doCancelAllAuction = async () => {
    const list = this.computedList(this.currentKey).list.filter(item => item.state === 0)
    t('我的委托.一键取消', {
      length: list.length
    })

    for (const item of list) {
      throttleInfo(`${list.findIndex(i => item.id === i.id) + 1} / ${list.length}`)
      await tinygrailStore.doAuctionCancel({
        id: item.id
      })
    }
    feedback()

    await this.fetchList(this.currentKey)
    info('操作完成')
  }
}
