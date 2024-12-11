/*
 * @Author: czy0729
 * @Date: 2024-09-08 13:35:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-12 05:09:38
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
  nickname: '',
  sign_input: '',
  avatar: '',
  bg: '',
  selectedIndex: 0,
  bgs: [],
  pixivs: [],
  avatars: [],

  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
