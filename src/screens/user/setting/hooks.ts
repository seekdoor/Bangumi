/*
 * @Author: czy0729
 * @Date: 2024-04-19 16:42:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-24 13:16:35
 */
import { useCallback, useState } from 'react'
import { systemStore } from '@stores'
import { INIT_SETTING } from '@stores/system/init'
import { BooleanKeys, NonBooleanKeys } from '@types'

type Setting = typeof INIT_SETTING

/** 延迟切换设置, 更快响应且避免卡住 UI */
export function useAsyncSwitchSetting(key: BooleanKeys<Setting>) {
  const [value, setValue] = useState(systemStore.setting[key])
  const handleSwitch = useCallback(() => {
    setValue(!value)
    setTimeout(() => {
      systemStore.switchSetting(key)
    }, 40)
  }, [value])

  return {
    value,
    handleSwitch
  }
}

/** 延迟更新设置, 更快响应且避免卡住 UI */
export function useAsyncSetSetting<T extends NonBooleanKeys<Setting>>(key: T) {
  const [value, setValue] = useState(systemStore.setting[key])
  const handleSet = useCallback(
    (updateValue: Setting[T]) => {
      setValue(updateValue)
      setTimeout(() => {
        systemStore.setSetting(key, updateValue)
      }, 40)
    },
    [value]
  )

  return {
    value,
    handleSet
  }
}
