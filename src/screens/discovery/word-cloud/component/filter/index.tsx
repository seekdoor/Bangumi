/*
 * @Author: czy0729
 * @Date: 2024-11-02 08:08:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-04 16:07:22
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Loading, Text } from '@components'
import { IconTouchable, Popover } from '@_'
import { _ } from '@stores'
import { confirm } from '@utils'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE, SUBJECT_TYPE, WEB } from '@constants'
import { CUT_TYPE, METAS } from '../../ds'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

const SUBJECT_TYPE_DS = SUBJECT_TYPE.map(item => item.title)

function Filter(_props, { $ }: Ctx) {
  if (!$.userId) return null

  const positions = ['全部职位', ...$.positions]
  const elSplit = (
    <Text style={styles.split} type='__plain__' size={13} bold>
      ·
    </Text>
  )

  const years = ['收藏时间', ...$.years]
  return (
    <Flex style={styles.container} justify='center'>
      <Popover style={styles.item} data={SUBJECT_TYPE_DS} onSelect={$.selectSubjectType}>
        <Flex>
          <Text type='__plain__' size={13} bold>
            {MODEL_SUBJECT_TYPE.getTitle($.state.subjectType)}
          </Text>
          {WEB && $.state.fetchingCollections && (
            <View style={styles.loading}>
              <Loading.Mini />
            </View>
          )}
        </Flex>
      </Popover>
      {elSplit}
      <Popover style={styles.item} data={CUT_TYPE} onSelect={$.selectCutType}>
        <Text type='__plain__' size={13} bold>
          {$.state.cutType}
        </Text>
      </Popover>
      {$.state.cutType === '标签' ? (
        <>
          {elSplit}
          <Popover style={styles.item} data={METAS} onSelect={$.selectSubCutType}>
            <Text type='__plain__' size={13} bold>
              {$.state.subCutType || METAS[0]}
            </Text>
          </Popover>
        </>
      ) : (
        positions.length > 1 && (
          <>
            {elSplit}
            <Popover style={styles.item} data={positions} onSelect={$.selectSubCutType}>
              <Text type='__plain__' size={13} bold>
                {$.state.subCutType || positions[0]}
              </Text>
            </Popover>
          </>
        )
      )}
      {years.length > 1 && (
        <>
          {elSplit}
          <Popover style={styles.item} data={years} onSelect={$.selectYear}>
            <Text type='__plain__' size={13} bold>
              {$.state.year || years[0]}
            </Text>
          </Popover>
        </>
      )}
      {WEB && !$.state.fetchingCollections && (
        <IconTouchable
          style={[_.ml._xs, _.mr._md]}
          name='md-refresh'
          size={16}
          onPress={() => {
            confirm('确定重新获取收藏?', () => {
              $.batchUserSubjectThenCut(true)
            })
          }}
        />
      )}
    </Flex>
  )
}

export default obc(Filter, COMPONENT)
