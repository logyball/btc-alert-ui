import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import axios from 'axios'

async function apiLogin(email, password) {
    let res = await axios.post('user/login', {
        email,
        password
    })

    // TODO - check res code
    return {
        token: res.data.token,
        email: email
    }
}

async function apiRegister(name, email, password) {
    let res = await axios.post('user/signup', {
        email,
        password,
        name
    })

    // TODO - check res code
    return {
        token: res.data.token,
        email: email
    }
}

export const useAuthStore = defineStore({
    id: 'store',

    state: () => {
        return {
            isLoggedIn: useLocalStorage('isLoggedIn', false),
            userEmail: useLocalStorage('userEmail', ""),
            userToken: useLocalStorage('userToken', ""),
            errorMessage: '',
        }
    },

    actions: {
        async login(userData) {
            await apiLogin(userData.email, userData.password)
                .then(userData => {
                    this.$patch({
                        isLoggedIn: true,
                        userEmail: userData.email,
                        userToken: userData.token,
                        errorMessage: ''
                    })
                }).catch(err => {
                    console.error(err)
                    this.$patch({
                        errorMessage: "Bad Login"
                    })
                }) 
        },

        async register(userData) {
            await apiRegister(userData.name, userData.email, userData.password)
                .then(userData => {
                    this.$patch({
                        isLoggedIn: true,
                        userEmail: userData.email,
                        userToken: userData.token,
                        errorMessage: ''
                    })
                }).catch(err => {
                    console.error(err)
                    this.$patch({
                        errorMessage: "Bad Login"
                    })
                }) 
        },

        logout() {
            this.$patch({
                isLoggedIn: false,
                userEmail: "",
                userToken: ""
            })
        }


    }

})