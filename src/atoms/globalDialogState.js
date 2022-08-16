import { atom } from 'recoil'

export const globalDialogState = atom({
    key: 'globalDialogState',
    default: {
        title: "",
        message: "",
        isOpen: false,
    },
})