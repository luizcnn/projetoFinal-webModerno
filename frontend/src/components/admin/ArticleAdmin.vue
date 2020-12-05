<template>
  <div class="articles-admin">
      <b-form>
        <input id="article-id" type="hidden" v-model="article.id" />
        <b-form-group label="Nome:" label-for="article-name">
          <b-form-input
            id="article-name"
            type="text"
            v-model="article.name"
            :readonly="mode === 'remove'"
            required
            placeholder="Informe o Nome do Artigo..."
          />
        </b-form-group>
        <b-form-group label="Descrição:" label-for="article-description">
          <b-form-input
            id="article-description"
            type="text"
            v-model="article.description"
            :readonly="mode === 'remove'"
            required
            placeholder="Informe a Descrição do Artigo..."
          />
        </b-form-group>
        <b-form-group label="Imagem (URL):" label-for="article-imageUrl" v-show="mode === 'save'">
          <b-form-input
            id="article-imageUrl"
            type="text"
            v-model="article.imageUrl"
            :readonly="mode === 'remove'"
            required
            placeholder="Informe a URL da Imagem do Artigo..."
          />
        </b-form-group>
        <b-form-group label="Categoria:" label-for="article-categoryId" v-show="mode === 'save'">
          <b-form-select
            id="article-categoryId" 
            v-model="article.categoryId" 
            :options="categories" 
          />
        </b-form-group>
        <b-form-group label="Autor:" label-for="article-userId" v-show="mode === 'save'">
          <b-form-select
            id="article-userId" 
            v-model="article.userId" 
            :options="users" 
          />
        </b-form-group>
        <b-form-group label="Conteúdo" label-for="article-content">
          <VueEditor
            v-show="mode === 'save'" 
            v-model="article.content"
            placeholder="Informe o conteúdo do artigo"
          />
        </b-form-group>
        <b-row>
          <b-col xs=12>
            <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
          </b-col>
        </b-row>
        <hr>
      </b-form>
      <b-table striped :items="articles" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadArticle(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadArticle(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
    <b-pagination 
      size="md" 
      v-model="page" 
      :total-rows="count" 
      :per-page="limit" 
    />
  </div>
</template>

<script>
import axios from 'axios'
import { VueEditor } from 'vue2-editor'
import {baseApiUrl, showError} from '@/global'

export default {
    name: "ArticleAdmin",
    components: { VueEditor },
    data: function() {
      return {
        mode: 'save',
        article: {},
        articles: [],
        category: {},
        categories: [],
        user: {},
        users: [],
        page: 1,
        limit: 0,
        count: 0,
        fields: [
          {key: 'id', label: "Código", sortable: true},
          {key: 'name', label: "Nome", sortable: true},
          {key: 'description', label: "Descrição", sortable: true},
          {key: 'actions', label: "Ações"}
        ]
      }
    },
    methods: {
      loadArticles() {
        axios.get(`${baseApiUrl}/articles?page=${this.page}`)
          .then(res => {
            //this.articles = res.data
            this.articles = res.data.data
            this.count = res.data.count
            this.limit = res.data.limit
          })
      },
      loadCategories() {
        axios.get(`${baseApiUrl}/categories`)
          .then(res => {
            this.categories = res.data.map(category => {
              return {value: category.id, text: category.path}
            })
          })
      },
      loadUsers() {
        axios.get(`${baseApiUrl}/users`)
          .then(res => {
            this.users = res.data.map(user => {
              return {value: user.id, text: `${user.name} - ${user.email}`}
            })
          })
      },
      save() {
        const id = this.article.id ? `/${this.article.id}` : ''
        const method = this.article.id ? 'put' : 'post'
        
        axios[method](`${baseApiUrl}/articles${id}`, this.article)
          .then(() => {
            this.$toasted.global.defaultSuccess()
            this.reset()
          })
          .catch(showError)
      },
      remove() {
        const id = this.article.id

        axios.delete(`${baseApiUrl}/articles/${id}`)
          .then(() => {
            this.$toasted.global.defaultSuccess()
            this.reset()
          })
      },
      reset() {
        this.mode = 'save'
        this.article = {}
        this.category = {}
        this.user = {}
        this.loadCategories()
        this.loadUsers()
        this.loadArticles()
      },
      loadArticle(article, mode = 'save') {
        this.mode = mode
        axios.get(`${baseApiUrl}/articles/${article.id}`)
          .then(res => this.article = res.data)
      }
    },
    watch: {
      page() {
        this.loadArticles()
      }
    },
    mounted () {
      this.loadArticles()
      this.loadCategories()
      this.loadUsers()
    }
}
</script>

<style>

</style>