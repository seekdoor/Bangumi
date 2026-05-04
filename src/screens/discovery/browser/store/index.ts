/*
 * @Author: czy0729
 * @Date: 2019-12-30 18:05:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-30 05:39:31
 */
import Action from './action'
import { DATE, EXCLUDE_STATE, NAMESPACE, RESET_STATE } from './ds'

import type { STATE } from './ds'

export default class ScreenBrowser extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    if (!this.state._loaded) {
      storageData.airtime = storageData.airtime || DATE.getFullYear()
      storageData.month = storageData.month || DATE.getMonth() + 1
    }

    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return this.fetchBrowser(true)
  }

  /** 下拉刷新 */
  onHeaderRefresh = () => {
    return this.fetchBrowser(true)
  }

  unmount = () => {
    this.scrollToOffset = null
    this.setState(RESET_STATE)
  }
}
