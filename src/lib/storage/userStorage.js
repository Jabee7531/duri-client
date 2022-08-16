const key = "USER"

const userStorage = {
    get() {
        const data = localStorage.getItem(key)
        try {
            if (!data) return null
            const parsed = JSON.parse(data)
            return parsed
        } catch (e) {
            localStorage.removeItem(key)
            return null
        }
    },
    set(user) {
        localStorage.setItem(key, JSON.stringify(user))
    },
    clear() {
        localStorage.removeItem(key)
    }

}

export default userStorage