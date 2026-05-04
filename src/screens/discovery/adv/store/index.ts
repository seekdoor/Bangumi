/*
 * @Author: czy0729
 * @Date: 2024-07-14 16:05:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-14 16:07:20
 */
import { collectionStore } from '@stores'
import { init } from '@utils/subject/adv'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, RESET_STATE } from './ds'

import type { STATE } from './ds'

let _loaded = false

export default class ScreenADV extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      _loaded
    })
    if (!_loaded) await init()
    _loaded = true

    collectionStore.fetchUserCollectionsQueue(false, '游戏')

    this.search()

    setTimeout(() => {
      this.setState({
        _loaded: true
      })
    }, 120)
  }

  unmount = () => {
    this.scrollToOffset = null
    this.setState(RESET_STATE)
  }
}
