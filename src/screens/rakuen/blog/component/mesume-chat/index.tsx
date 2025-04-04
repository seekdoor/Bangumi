/*
 * @Author: czy0729
 * @Date: 2025-02-04 07:13:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-10 00:00:57
 */
import React from 'react'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function MesumeChat() {
  const { $ } = useStore<Ctx>()
  return (
    <IconTouchable
      style={styles.mesume}
      size={18}
      color={_.colorDesc}
      name='md-chat-bubble-outline'
      onPress={$.doChat}
    />
  )
}

export default ob(MesumeChat, COMPONENT)
