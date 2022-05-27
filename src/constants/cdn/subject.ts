/*
 * @Author: czy0729
 * @Date: 2022-05-23 05:46:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-27 08:20:35
 */
import { Id, SubjectId } from '@types'
import { HOST_CDN } from '../constants'
import { VERSION_SUBJECT, VERSION_MONO } from './ds'
import { getVersion, getFolder } from './utils'

/** 条目 CDN 自维护数据 */
export const CDN_SUBJECT = (subjectId: SubjectId) => {
  const v = getVersion('VERSION_SUBJECT', VERSION_SUBJECT)
  return `${HOST_CDN}/gh/czy0729/Bangumi-Subject@${v}/data/${getFolder(
    subjectId
  )}/${subjectId}.json`
}

/** 角色 CDN 自维护数据 */
export const CDN_MONO = (monoId: Id, type: 'data' | 'person' = 'data') => {
  const v = getVersion('VERSION_MONO', VERSION_MONO)
  return `${HOST_CDN}/gh/czy0729/Bangumi-Mono@${v}/${type}/${getFolder(
    monoId
  )}/${monoId}.json`
}
