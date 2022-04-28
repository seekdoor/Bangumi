/*
 * @Author: czy0729
 * @Date: 2021-01-21 19:56:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-28 18:07:20
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconTabsHeader } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { info } from '@utils/ui'
import i18n from '@constants/i18n'

function IconGroup(props, { $, navigation }) {
  return (
    <IconTabsHeader
      style={[styles.icon, _.isPad && styles.iconPad]}
      name='md-filter-none'
      size={18}
      onPress={() => {
        if (!$.isWebLogin) {
          info(`请先${i18n.login()}`)
          return
        }

        t('超展开.跳转', {
          to: 'Mine'
        })

        navigation.push('Mine')
      }}
    >
      <Heatmap right={-40} id='超展开.跳转' to='Mine' alias='我的小组' />
    </IconTabsHeader>
  )
}

export default obc(IconGroup)

const styles = _.create({
  icon: {
    marginBottom: 0,
    marginLeft: _.xs,
    borderRadius: 40,
    overflow: 'hidden'
  },
  iconPad: {
    height: 52
  }
})
