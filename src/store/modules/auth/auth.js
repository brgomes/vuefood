import axios from 'axios'

import { TOKEN_NAME, API_VERSION } from '@/configs/api'

export default {
    state: {
        me: {
            name: '',
            email: '',
        },
        authenticated: false,
    },

    mutations: {
        SET_ME (state, me) {
            state.me = me
        },

        SET_AUTHENTICATED (state, status) {
            state.authenticated = status
        },

        LOGOUT (state) {
            state.me = {
                name: '',
                email: ''
            }

            state.authenticated = false
        }
    },

    actions: {
        register({ commit }, params) {
            return axios.post(`${API_VERSION}/client`, params)
        },

        login ({ commit, dispatch }, params) {
            return axios.post(`${API_VERSION}/sanctum/token`, params)
                .then(response => {
                    const token = response.data.token
                    localStorage.setItem(TOKEN_NAME, token)

                    dispatch('getMe')
                })
        },

        getMe ({commit}) {
            const token = localStorage.getItem(TOKEN_NAME)
            if (!token) return;

            return axios.get(`${API_VERSION}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => commit('SET_ME', response.data.data))
            .catch(error => localStorage.removeItem(TOKEN_NAME))
        },

        logout ({commit}) {
            const token = localStorage.getItem(TOKEN_NAME)
            if (!token) return;

            return axios.post(`${API_VERSION}/auth/logout`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                commit('LOGOUT')

                localStorage.removeItem(TOKEN_NAME)
            })
        }
    }
}
