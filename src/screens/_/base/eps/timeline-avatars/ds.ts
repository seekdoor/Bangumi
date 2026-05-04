/*
 * @Author: czy0729
 * @Date: 2026-05-02 10:40:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-02 10:57:32
 */

/** 基础物理常数 */
export const AVATAR_SIZE = 18
export const GAP = 0
export const MOVE_DISTANCE = AVATAR_SIZE + GAP

/** 停顿时间 */
const PAUSE_DURATION = 5000

/** 移动动作持续时间 */
const MOVE_DURATION = 400

/** 每个头像的总周期 = 停顿 + 移动 */
export const ANIM_DURATION_PER_AVATAR = PAUSE_DURATION + MOVE_DURATION

/** 算出停顿占比，供插值函数使用 */
export const PAUSE_RATIO = PAUSE_DURATION / ANIM_DURATION_PER_AVATAR
