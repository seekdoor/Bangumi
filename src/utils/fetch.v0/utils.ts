/*
 * @Author: czy0729
 * @Date: 2022-07-16 07:33:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-04 13:18:32
 */
import { WEB } from '@constants'
import { APP_ID, UA } from '@constants/constants'
import { syncUserStore } from '../async'
import { isDevtoolsOpen } from '../dom'
import { safe } from '../fetch'
import { axios } from '../thirdParty'
import { getTimestamp, urlStringify } from '../utils'

import type { Config, RequestConfig } from './types'

export async function request<T>(
  url: string,
  data?: object,
  config: RequestConfig = {
    timeout: 8000,
    auth: true,
    onError: () => {}
  }
): Promise<T> {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  try {
    // 随机数防止接口 CDN 缓存
    url += `${url.includes('?') ? '&' : '?'}${urlStringify({
      app_id: APP_ID,
      state: getTimestamp()
    })}`

    const passConfig: Config = {
      method: !!data && typeof data === 'object' ? 'post' : 'get',
      url,
      headers: {}
    }

    if (!WEB) {
      passConfig.headers['User-Agent'] = UA
    }

    if (config.auth) {
      const { accessToken } = syncUserStore()
      if (accessToken.access_token) {
        passConfig.headers.Authorization = `${accessToken.token_type} ${accessToken.access_token}`
      }
    }

    if (passConfig.method === 'post') {
      passConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      passConfig.data = urlStringify(data)
    }

    // @ts-expect-error
    const { data: responseData } = await axios(passConfig)
    return safe(responseData) as T
  } catch (ex) {
    if (typeof config?.onError === 'function') config.onError(ex)
    return {} as T
  }
}
