/*
 * @Author: czy0729
 * @Date: 2024-11-19 06:30:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 05:01:32
 */
import { Loaded } from '@types'

export const EXCLUDE_STATE = {
  level: '',
  sort: '',
  _loaded: false as Loaded
}

export const HM = ['tinygrail/advance-auction', 'TinygrailAdvanceAuction'] as const