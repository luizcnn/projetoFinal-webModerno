<template>
  <div class="articles-by-category">
      <PageTitle icon="fa fa-folder-o" :main="category.name" sub="Categoria" />
      <ul>
          <li v-for="article in articles" :key="article.id">
              <ArticleItem :article="article" />
          </li>
      </ul>
      <div class="load-more">
          <button 
            v-if="loadMore" 
            class="btn btn-lg btn-outline-primary"
            @click="getArticles"
        >
            Carregar Mais
        </button>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl } from '@/global'
import PageTitle from '../template/PageTitle'
import ArticleItem from './ArticleItem'

export default {
    name: "ArticlesByCategory",
    components: { PageTitle, ArticleItem },
    data: function() {
        return {
            category: {},
            articles: [],
            page: 1,
            loadMore: true
        }
    },
    methods: {
        getCategory() {
            const url = `${baseApiUrl}/categories/${this.category.id}`
            axios(url).then(res => this.category = res.data)
        },
        getArticles() {
            const url = `${baseApiUrl}/categories/${this.category.id}/articles?page=${this.page}`

            axios(url).then(res => {
                this.articles = this.articles.concat(res.data)
                this.page++

                if(res.data.length === 0) {
                    this.loadMore = false
                }
            })
        },
        reset() { 
            this.category.id = this.$route.params.id
            this.articles = []
            this.page = 1
            this.loadMore = true
        }
    },
    watch: {
        $route() {
            this.reset()
            this.getCategory()
            this.getArticles()
        }
    },
    mounted () {
        this.category.id = this.$route.params.id
        this.getCategory()
        this.getArticles()
    }
}
</script>

<style>
    .articles-by-category ul {
        list-style-type: none;
        padding: 0;
    }

    .articles-by-category a:hover {
        text-decoration: none;
        color: #000;
    }

    .articles-by-category .load-more {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
    }
</style>