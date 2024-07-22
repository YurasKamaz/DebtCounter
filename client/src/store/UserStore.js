import axios from "axios"
import { makeAutoObservable } from "mobx"
import authService from "../services/authService"
import { API_URL } from "../http"

class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
    }


    setIsAuth(bool) {
        this._isAuth = bool
        localStorage.setItem('isAuth', bool)
    }

    setUser(user) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }

    async login(username, password) {
        try {
            const response = await authService.login(username, password)
            //console.log(response.data)
            localStorage.setItem('token', response.data.accessToken)
            this.setIsAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e)
        }
    }

    async registration(username, password) {
        try {
            const response = await authService.registration(username, password)
            //console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setIsAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async logout() {
        try {
            const response = await authService.logout()
            localStorage.setItem('token', '0')
            this.setIsAuth(false)
            this.setUser({})
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
            //console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setIsAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response.data.message)
        }
    }
}

const userStore = new UserStore();
export default userStore;