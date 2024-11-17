/*
 * @Author: czy0729
 * @Date: 2024-07-30 20:26:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:11:48
 */
import React from 'react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'

function More() {
  const { $ } = useStore<Ctx>()
  const { fixedFilter, fixedPagination } = $.state
  return (
    <ToolBar.Popover
      data={[
        `选项 · ${fixedFilter ? '锁定上方' : '浮动'}`,
        `分页 · ${fixedPagination ? '锁定下方' : '浮动'}`
      ]}
      icon='md-more-vert'
      iconColor={_.colorDesc}
      iconSize={16}
      type='desc'
      transparent
      onSelect={(title: string) => {
        if (title.includes('选项')) return $.onToggleFixed('fixedFilter')
        if (title.includes('分页')) return $.onToggleFixed('fixedPagination')
      }}
    />
  )
}

export default ob(More)
