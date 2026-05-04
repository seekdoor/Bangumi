/*
 * @Author: czy0729
 * @Date: 2024-02-12 01:36:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-30 00:19:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap, Track } from '@components'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

import type { Props } from './types'

function Extra({ year }: Props) {
  r(COMPONENT)

  return (
    <>
      <Track title='年鉴' hm={[`award/${year}`, 'Award']} />
      <Heatmap id='年鉴' screen='Award' />
      <Heatmap right={80} bottom={40} id='年鉴.跳转' transparent />
    </>
  )
}

export default observer(Extra)
