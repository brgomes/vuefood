const mutations = {
    SET_COMPANIES (state, companies) {
        state.items = companies
    },

    SET_SELECTED_COMPANY (state, company) {
        state.selectedCompany = Object.assign(state.selectedCompany, company)
    },

    SET_CATEGORIES_COMPANY (state, categories) {
        state.categoriesSelectedCompany = categories
    },

    SET_PRODUCTS_COMPANY (state, products) {
        //console.log(products.data)
        state.selectedCompany.products = products
    },

    SET_TABLE_COMPANY (state, table) {
        state.companySelected.table = table
    },

    REMOVE_TABLE_COMPANY (state, table) {
        state.companySelected.table = {
            identify: '',
            description: '',
            name: ''
        }
    },
}

export default mutations
