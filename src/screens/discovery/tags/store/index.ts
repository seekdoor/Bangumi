/*
 * @Author: czy0729
 * @Date: 2019-10-03 14:48:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-18 07:34:10
 */
import { LocalState } from '@types'
import { getType, loadTyperankIdsData } from '../utils'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

/** 标签页面状态机 */
class ScreenTags extends Action {
  init = async () => {
    const state: LocalState<typeof STATE, typeof EXCLUDE_STATE> = await this.getStorage(NAMESPACE)
    if (state.rec) await loadTyperankIdsData(getType(state.page))

    this.setState({
      ...state,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return this.fetchList(this.type, true)
  }
}

export default ScreenTags
