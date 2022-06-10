import Vue from "vue"
import VueX from 'vuex'

import { state, mutations } from './default'
import companies from './modules/companies'

Vue.use(VueX)

const store = new VueX.Store({
    modules: {
        companies
    },

    state,
    mutations
})

export default store
