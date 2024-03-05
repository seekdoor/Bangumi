/*
 * @Author: czy0729
 * @Date: 2022-11-07 18:45:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-03 22:09:59
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingVertical: 12,
    paddingHorizontal: _.wind,
    backgroundColor: _.colorTinygrailContainer
  },
  progress: {
    maxWidth: '72%',
    marginTop: 24
  }
}))