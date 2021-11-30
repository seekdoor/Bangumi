/*
 * @Author: czy0729
 * @Date: 2021-11-30 06:27:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-30 14:53:29
 */
import { useEffect, useState } from 'react'
import * as ScreenOrientation from 'expo-screen-orientation'

export default function useOrientation() {
  const [screenOrientation, setScreenOrientation] = useState()

  useEffect(() => {
    const onOrientationChange = currentOrientation => {
      const orientationValue = currentOrientation.orientationInfo.orientation
      setScreenOrientation(orientationValue)
    }

    const initScreenOrientation = async () => {
      const currentOrientation = await ScreenOrientation.getOrientationAsync()
      setScreenOrientation(currentOrientation)
    }

    const screenOrientationListener =
      ScreenOrientation.addOrientationChangeListener(onOrientationChange)

    initScreenOrientation()
    return () => {
      ScreenOrientation.removeOrientationChangeListener(screenOrientationListener)
    }
  }, [])

  return screenOrientation == 3 || screenOrientation == 4 ? 'LANDSCAPE' : 'PORTRAIT'
}
