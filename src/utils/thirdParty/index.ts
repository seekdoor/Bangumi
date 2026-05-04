/*
 * @Author: czy0729
 * @Date: 2025-11-03 15:17:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-04 12:48:41
 */
import Axios from './axios'

type AxiosFunction = <T = any>(config: {
  method: 'get' | 'post'
  url: string
  headers?: {
    'Content-Type'?: 'application/json'
    'User-Agent'?: string
    Authorization?: string
    Referer?: string
  }
  data?: Record<string, any>
}) => Promise<{ data: T }>

type AxiosExtensions = {
  defaults: {
    withCredentials?: boolean
    timeout?: number
  }
}

type CustomAxios = AxiosFunction & AxiosExtensions

const axiosInstance: CustomAxios = (config: any) => {
  // @ts-expect-error
  return Axios(config)
}

axiosInstance.defaults = {
  withCredentials: false,
  timeout: 8000
}

export { axiosInstance as axios }
