<template>
    <div>
        <!-- About Tenant and Categories -->
        <h1 class="my-4 title-tenant text-center">{{ company.name }}</h1>
        <div class="row">
            <div class="list-group">
                <a href="#"
                    :class="['list-group-item', categoryInFilter('')]"
                    @click.prevent="filterByCategory('')">
                    Todas
                </a>
                <a href="#"
                    v-for="(category, index) in categories.data" :key="index"
                    :class="['list-group-item', categoryInFilter(category.identify)]"
                    @click.prevent="filterByCategory(category.identify)">
                    {{ category.name }}
                </a>
            </div>
        </div>

        <!-- Cards Produtos -->
        <div class="row my-4">
            <div v-if="company.products.data.length === 0">
                Nenhum produto
            </div>

            <div class="col-lg-4 col-md-6 mb-4" v-for="(product, index) in company.products.data" :key="index">
                <div :class="['card', 'h-100', {'disabled': productInCart(product)}]">
                    <a href="#">
                        <div class="card-image">
                            <img class="card-img-top" :src="product.image" alt="">
                        </div>
                    </a>
                    <div class="card-body">
                        <h4 class="card-title">
                            <a href="#">{{ product.title }}</a>
                        </h4>
                        <h5>R$ {{ product.price }}</h5>
                        <p class="card-text">{{ product.description }}</p>
                    </div>
                    <div class="card-footer card-footer-custom">
                        <a href="#"
                          @click.prevent="addProductCart(product)"
                        >
                          Adicionar no Carrinho <i class="fas fa-cart-plus"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  props: ['companyFlag'],

  created() {
    if (this.company.name === '') {
      return this.$router.push({name: 'home'})
    }

    this.getCategoriesByCompany(this.company.uuid)
      .catch(response => this.$vToastify.error('Falha ao carregar as categorias', 'Erro'))
    
    /*this.getProductsByCompany(this.company.uuid)
      .catch(response => this.$vToastify.error('Falha ao carregar os produtos', 'Erro'))*/
    
    this.loadProducts()
  },

  computed: {
    ...mapState({
      company: state => state.companies.selectedCompany,
      categories: state => state.companies.categoriesSelectedCompany,
      productsCart: state => state.cart.products,
    })
  },

  data() {
    return {
      filters: {
        category: ''
      }
    }
  },

  methods: {
    ...mapActions([
     'getCategoriesByCompany',
     'getProductsByCompany'
    ]),

    ...mapMutations({
      addProductCart: 'ADD_PRODUCT_CART'
    }),

    loadProducts () {
      const params = {
        token_company: this.company.uuid,
      }
      
      if (this.filters.category) {
        params.categories = [
          this.filters.category
        ]
      }
      
      this.getProductsByCompany(params)
        .catch(response => this.$vToastify.error('Falha ao carregar os produtos', 'Erro'))
    },

    filterByCategory(identify) {
      this.filters.category = identify

      this.loadProducts()
    },

    categoryInFilter(identify) {
      return identify === this.filters.category ? 'active' : ''
    },

    productInCart(product) {
      let inCart = false

      this.productsCart.map((prodCart, index) => {
        if (prodCart.identify === product.identify) {
          inCart = true
        }
      })

      return inCart
    }
  }
}
</script>
