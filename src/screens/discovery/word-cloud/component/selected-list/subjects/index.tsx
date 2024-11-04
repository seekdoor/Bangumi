/*
 * @Author: czy0729
 * @Date: 2024-11-03 04:54:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-04 17:43:43
 */
import React from 'react'
import { View } from 'react-native'
import { PaginationList2 } from '@_'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import { NUM_COLUMNS } from '../ds'
import { renderItem } from './utils'
import { styles } from './styles'

function Subjects(_props, { $ }: Ctx) {
  if (!$.selectedSubjects.length) return null

  return (
    <PaginationList2
      keyExtractor={keyExtractor}
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      data={$.selectedSubjects}
      limit={20}
      numColumns={NUM_COLUMNS}
      renderItem={renderItem}
      removeClippedSubviews={false}
      footerEmptyDataComponent={<View />}
      footerNoMoreDataComponent={<View />}
    />
  )
}

export default obc(Subjects)
