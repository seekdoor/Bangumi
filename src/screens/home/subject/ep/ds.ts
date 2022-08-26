/*
 * @Author: czy0729
 * @Date: 2022-08-26 11:22:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 11:31:06
 */
import { systemStore } from '@stores'
import { StoreType as $ } from '../types'
import { memoStyles } from './styles'

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  watchedEps: '' as $['state']['watchedEps'],
  totalEps: 0 as $['subjectFormHTML']['totalEps'],
  onAirCustom: {} as $['onAirCustom'],
  isDoing: false as boolean,
  showEpInput: true as typeof systemStore.setting.showEpInput,
  showCustomOnair: true as typeof systemStore.setting.showCustomOnair,
  onChangeText: (() => {}) as $['changeText'],
  onSelectOnAir: (() => {}) as $['onSelectOnAir'],
  onResetOnAirUser: (() => {}) as $['resetOnAirUser'],
  doUpdateSubjectEp: (() => {}) as $['doUpdateSubjectEp']
}

export const WEEK_DAY_DS = [
  '周日',
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六'
] as const

export const WEEK_DAY_MAP = {
  0: '周日',
  1: '周一',
  2: '周二',
  3: '周三',
  4: '周四',
  5: '周五',
  6: '周六'
} as const

export const HOUR_DS = [
  '20',
  '21',
  '22',
  '23',
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19'
] as const

export const MINUTE_DS = [
  '00',
  '05',
  '10',
  '15',
  '20',
  '25',
  '30',
  '35',
  '40',
  '45',
  '50',
  '55'
] as const
