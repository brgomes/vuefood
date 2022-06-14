import Vue from "vue"
import VueX from 'vuex'

import { state, mutations } from './default'
import companies from './modules/companies'
import cart from './modules/cart/cart'
import auth from './modules/auth/auth'
import orders from './modules/orders/orders'

Vue.use(VueX)

const store = new VueX.Store({
    modules: {
        companies,
        cart,
        auth,
        orders
    },

    state,
    mutations
})

export default store
