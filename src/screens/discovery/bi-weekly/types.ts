/*
 * @Author: czy0729
 * @Date: 2024-05-14 06:11:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-30 04:40:00
 */
import type { TopicId, WithNavigation } from '@types'
import type Store from './store'
import type { TYPE_DS } from './ds'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type DataItem = {
  topicId: TopicId
  title: string
  desc?: string
  cover: string
}

export type Data = DataItem[]

export type Type = (typeof TYPE_DS)[number]
