/*
 * @Author: czy0729
 * @Date: 2022-11-07 14:09:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 16:12:40
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  modal: {
    width: _.window.width - 2 * _.wind,
    maxWidth: 400,
    backgroundColor: _.select(_.__colorBg__, _.colorTinygrailContainer),
    borderRadius: _.radiusMd
  },
  focus: {
    marginTop: -Math.floor(_.window.height * 0.56)
  },
  wrap: {
    width: '100%',
    maxWidth: _.window.maxWidth,
    paddingBottom: _.sm,
    marginTop: _.md
  },
  item: {
    marginBottom: _.md
  },
  btn: {
    width: 240,
    backgroundColor: _.select(_.colorTinygrailBg, _.colorTinygrailIcon),
    borderColor: _.select(_.colorTinygrailBg, _.colorTinygrailIcon)
  },
  text: {
    width: 160,
    color: _.select(_.colorTinygrailPlain, _.__colorPlain__)
  }
}))
