import { atom } from 'recoil'

import { User } from '../modules/types/User'


// undefined : まだログイン確認が完了していない状態とする
// null      : ログイン確認をした結果、ログインしていなかった状態とする
export const currentUserState = atom<undefined | null | User>({
  key: 'CurrentUser',
  default: undefined,
})
