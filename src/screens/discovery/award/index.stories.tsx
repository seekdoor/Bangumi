/*
 * @Author: czy0729
 * @Date: 2023-04-12 09:54:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-30 00:18:14
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Award as Component } from '@screens'

export default {
  title: 'screens/Award',
  component: Component
}

export const Award = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Award')} />
    </StorybookList>
  </StorybookSPA>
)
