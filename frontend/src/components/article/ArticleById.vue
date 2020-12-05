<template>
    <div class="article-by-id">
        <PageTitle icon="fa fa-file-o" :main="article.name" :sub="article.description"/>
        <div class="article-content" v-html="article.content" />
    </div>
</template>

<script>
import axios from 'axios'
import 'highlightjs/styles/dracula.css'
import hljs from 'highlightjs/highlight.pack.js'
import { baseApiUrl } from '@/global'
import PageTitle from '../template/PageTitle.vue'

export default {
    name: "ArticleById",
    components: { PageTitle },
    data: function() {
        return {
            article: {}
        }
    },
    methods: {
        loadArticle() {
            const url = `${baseApiUrl}/articles/${this.article.id}`

            axios(url).then(res => {
                this.article = res.data
            })
            
        }
    }, 
    mounted() {
        this.article.id = this.$route.params.id
        this.loadArticle()
    },
    updated() {
        document.querySelectorAll('.article-content pre').forEach(e => {
            hljs.highlightBlock(e)
        })
    }
    
}
</script>

<style>
    .article-content {
        background-color: #FFF;
        border-radius: 8px;
        padding: 25px;
    }
    /* Aqui é onde fica um código escrito no vue editor */
    .article-content pre {
        padding: 20px;
        border-radius: 8px;
        font-size: 1.2rem;
        color: white;
        background-color: #1e1e1e;
    }

    .article-content img {
        max-width: 100%;
    }

    .article-content :last-child {
        margin-bottom: 0px;
    }
</style>