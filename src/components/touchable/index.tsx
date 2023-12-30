/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Author: czy0729
 * @Date: 2019-03-28 15:35:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-30 17:37:36
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { FN } from '@constants'
import TouchableOpacity from './touchable-opacity'
import { defaultHitSlop } from './utils'
import { useCallOnceInInterval } from './hooks'
import { Props as TouchableProps } from './types'

export { TouchableProps }

/**
 * 触摸反馈整合
 *  - 因封装前并未有官方的 Pressable，没必要前不会考虑重新整合
 */
export const Touchable = observer(
  ({
    style,
    withoutFeedback = false,
    highlight = false,
    delay = true,
    hitSlop = defaultHitSlop,
    delayPressIn = 0,
    delayPressOut = 0,
    useRN = false,
    ripple,
    animate,
    scale,
    disabled,
    onPress = FN,
    children,
    ...other
  }: TouchableProps) => {
    const { handleDisabled, handlePress } = useCallOnceInInterval(onPress)
    const passProps = {
      style,
      hitSlop,
      delayPressIn,
      delayPressOut,
      // extraButtonProps: _.select(EXTRA_BUTTON_PROPS, EXTRA_BUTTON_PROPS_DARK),
      disabled: disabled || handleDisabled,
      useRN,
      onPress: handlePress,
      children,
      ...other
    }

    return <TouchableOpacity {...passProps} />
  }
)
