/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:52:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-30 05:59:27
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  touchable: {
    paddingLeft: _._wind
  },
  item: {
    paddingVertical: 12,
    paddingRight: _._wind
  },
  information: {
    maxWidth: '84%',
    paddingRight: _.md
  },
  sub: {
    paddingTop: 8,
    paddingLeft: 20,
    marginLeft: 20,
    marginBottom: 12,
    borderLeftWidth: 2,
    borderLeftColor: _.colorBorder
  },
  touch: {
    padding: 12,
    margin: -6
  }
}))
