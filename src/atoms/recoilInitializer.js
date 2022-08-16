import userStorage from '../lib/storage/userStorage'
import { userState } from './authState'

export default function recoilInitializer({ set }) {
    const user = userStorage.get()
    if (user) {
        set(userState, user)
    }
}