import Vue from "vue"
import VueX from 'vuex'

import { state, mutations } from './default'
import companies from './modules/companies'
import cart from './modules/cart/cart'

Vue.use(VueX)

const store = new VueX.Store({
    modules: {
        companies,
        cart
    },

    state,
    mutations
})

export default store
