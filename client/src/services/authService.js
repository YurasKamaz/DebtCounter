import $api from "../http/index.js"

export default class authService { 
    static async login(username, password) {
        return $api.post('/login', {username,  password})
    }

    static async registration(username, password) { 
        return $api.post('/registration', {username,  password})
    }

    static async logout() {
        return $api.post('/logout')
    }

    static async refreshTokens() {
        const response = await $api.get('/refresh')
        localStorage.setItem('token', response.data.accessToken)
    }
}