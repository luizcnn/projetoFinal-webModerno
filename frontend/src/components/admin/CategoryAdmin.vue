<template>
  <div class="category-admin">
    <b-form>
      <input id="category-id" type="hidden" v-model="category.id" />
      <b-row>
        <b-col xs=12>
          <b-form-group label="Nome:" label-for="category-name">
            <b-form-input 
              id="category-name" 
              type="text" 
              v-model="category.name" 
              required
              placeholder="Informe o Nome da Categoria..."
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs=12>
          <b-form-group label="Categoria pai:" label-for="category-parentId">
            <b-form-select
              id="category-parentId" 
              v-model="category.parentId" 
              :options="categories" 
              v-if="mode === 'save'"
            />
            <b-form-input
              id="category-parentId"
              v-model="category.path" 
              :options="categories" 
              readonly
              v-else
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs=12>
          <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
          <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-col>
      </b-row>
      <hr />
    </b-form>
    <b-table striped :items="categories" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadCategory(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadCategory(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from 'axios'
import {baseApiUrl, showError} from '@/global'

export default {
    name: "CategoryAdmin",
    data: function() {
      return {
        mode: 'save',
        category: {},
        categories: [],
        fields: [
          {key: 'id', label: 'Código', sortable: true},
          {key: 'name', label: 'Nome', sortable: true},
          {key: 'path', label: 'Caminho', sortable: true},
          {key: 'actions', label: 'Ações'}
        ],
        options: []
      }
    },
    methods: {
      loadCategories() {
        axios.get(`${baseApiUrl}/categories`)
          .then(res => {
            this.categories = res.data.map(category => {
              return {...category, value: category.id, text: category.path}
            })
          })
      },
      loadCategory(category, mode = 'save') {
        this.mode = mode
        this.category = { ...category }
      },
      reset() {
        this.mode = 'save'
        this.category = {}
        this.loadCategories()
      },
      remove() {
        const id = this.category.id

        axios.delete(`${baseApiUrl}/categories/${id}`)
          .then(() => {
            this.$toasted.global.defaultSuccess()
            this.reset()
          })
          .catch(showError)
      },
      save() {
        const method = this.category.id ? 'put' : 'post'
        const id = this.category.id ? `/${this.category.id}` : ''
        
        axios[method](`${baseApiUrl}/categories${id}`, this.category)
          .then(() => {
            this.$toasted.global.defaultSuccess()
            this.reset()
          })
          .catch(showError)
      }
    },
    mounted() {
      this.loadCategories()
    }
}
</script>

<style>

</style>