/*
 * @Author: czy0729
 * @Date: 2022-07-30 13:41:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-14 10:00:24
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingVertical: _.xs,
    paddingHorizontal: _.wind
  },
  search: {
    padding: _.sm,
    borderRadius: 20,
    overflow: 'hidden'
  },
  open: {
    padding: _.sm,
    marginRight: -_.sm,
    marginLeft: _.sm,
    borderRadius: 20,
    overflow: 'hidden'
  }
}))
