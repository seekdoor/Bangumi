/*
 * @Author: czy0729
 * @Date: 2022-08-19 05:04:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-13 05:32:44
 */
import { _ } from '@stores'
import { Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const STATE = {
  page: 0,

  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
