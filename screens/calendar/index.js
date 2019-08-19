/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-18 21:47:56
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Loading } from '@components'
import { open } from '@utils'
import { inject, withHeader, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import { HTML_CALENDAR } from '@constants/html'
import _ from '@styles'
import List from './list'
import Store from './store'

const title = '每日放送'

export default
@inject(Store)
@withHeader()
@observer
class Calendar extends React.Component {
  static navigationOptions = {
    title
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    navigation.setParams({
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          switch (key) {
            case '浏览器查看':
              open(HTML_CALENDAR())
              break
            default:
              break
          }
        }
      }
    })

    hm('calendar', title)
  }

  render() {
    const { $ } = this.context
    if (!$.calendar._loaded) {
      return <Loading style={_.container.flex} />
    }
    return <List />
  }
}
