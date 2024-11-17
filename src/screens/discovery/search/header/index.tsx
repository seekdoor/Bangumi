/*
 * @Author: czy0729
 * @Date: 2022-03-12 23:21:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 06:54:07
 */
import React from 'react'
import { Flex, Header as HeaderComp, Heatmap } from '@components'
import { useStore } from '@stores'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import T2S from '../component/t2s'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderComp
      title='搜索'
      hm={[$.url, 'Search']}
      headerRight={() => (
        <Flex>
          <T2S $={$} />
          <HeaderComp.Popover
            data={['浏览器查看']}
            onSelect={key => {
              if (key === '浏览器查看') {
                t('搜索.右上角菜单', { key })

                open($.url)
              }
            }}
          >
            <Heatmap id='搜索.右上角菜单' />
          </HeaderComp.Popover>
        </Flex>
      )}
    />
  )
}

export default ob(Header, COMPONENT)
