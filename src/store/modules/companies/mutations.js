export default {
    SET_COMPANIES (state, companies) {
        state.items = companies
    },

    SET_SELECTED_COMPANY (state, company) {
        state.selectedCompany = Object.assign(state.selectedCompany, company)
    },

    REMOVE_COMPANY_SELECTED (state) {
        state.selectedCompany = {
            name: '',
            products: {
                data: []
            },
            table: {
                identify: '',
                description: '',
                name: ''
            }
        },
    
        state.categoriesSelectedCompany = {
            data: []
        }
    },

    SET_CATEGORIES_COMPANY (state, categories) {
        state.categoriesSelectedCompany = categories
    },

    SET_PRODUCTS_COMPANY (state, products) {
        state.selectedCompany.products = products
    },

    SET_TABLE_COMPANY (state, table) {
        state.selectedCompany.table = table
    },

    REMOVE_TABLE_COMPANY (state, table) {
        state.selectedCompany.table = {
            identify: '',
            description: '',
            name: ''
        }
    },
}