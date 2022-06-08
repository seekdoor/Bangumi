/*
 * @Author: czy0729
 * @Date: 2022-01-10 11:19:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-05 06:05:31
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView, Touchable, Text, Image, Heatmap } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { hm, t } from '@utils/fetch'

const title = '资讯'

function List(props, { $ }) {
  const styles = memoStyles()
  const { show } = $.state
  const { list } = $.article
  const onPress = item => {
    t('Anitama.跳转', {
      to: 'WebBrowser',
      url: item.url
    })

    open(item.url)
    hm(item.url, title)
  }

  return (
    <ScrollView scrollToTop>
      {show && (
        <>
          <View style={styles.container}>
            {list.map((item, index) => (
              <Touchable
                key={item.aid}
                style={styles.item}
                onPress={() => onPress(item)}
              >
                <Text align='right'>
                  © {[item.author, item.origin].filter(item => !!item).join(' / ')}
                </Text>
                <Image
                  style={_.mt.md}
                  src={item.cover.url}
                  headers={item.cover.headers}
                  width={styles.cover.width}
                  height={styles.cover.height}
                  radius
                  shadow
                />
                <View style={styles.info}>
                  <Text size={18} type='title' bold>
                    {item.title}
                  </Text>
                  {!!item.subtitle && (
                    <Text style={_.mt.sm} lineHeight={18} type='sub' bold>
                      {item.subtitle}
                    </Text>
                  )}
                  {!!item.intro && (
                    <Text style={_.mt.md} type='sub' lineHeight={18}>
                      {item.intro}
                    </Text>
                  )}
                </View>
                {!index && <Heatmap id='Anitama.跳转' />}
              </Touchable>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  )
}

export default obc(List)

const memoStyles = _.memoStyles(() => {
  const width = _.window.width - _.wind * 2
  return {
    container: {
      minHeight: _.window.height
    },
    item: {
      paddingTop: _.md,
      paddingBottom: _.sm,
      paddingHorizontal: _._wind,
      marginVertical: _.md,
      marginHorizontal: _.wind,
      backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
      borderRadius: _.radiusMd,
      overflow: 'hidden'
    },
    cover: {
      width,
      height: width * 0.56
    },
    info: {
      paddingVertical: _.md
    }
  }
})