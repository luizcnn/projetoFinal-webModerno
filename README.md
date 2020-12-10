# Projeto Final - Curso de Web Moderno (Cod3r)
<p align="justify"> Projeto base de conhecimento, desenvolvido para finalização do curso de web moderno realizado na Cod3r </p>

<div style="display: flex; justify-content: center">
  <img src="https://img.shields.io/static/v1?label=Vue&message=Frontend&color=success&style=for-the-badge&logo=VUE"/>
  <img src="https://img.shields.io/static/v1?label=NodeJs&message=Backend&color=green&style=for-the-badge&logo=NODEJS"/>
</div>

> Status do Projeto: Finalizado :heavy_check_mark:

## Funcionalidades :trophy:
- Cadastro de usuários
  - Cadastro de usuários com persistência dos dados no PostgreSQL
  - Login de usuário e autenticação com token JWT
  - Exibição de funcionalidades diferentes para usuários comuns e administradores
- Cadastro de Artigos e de Categorias nas quais os artigos se aplicam
  - Persistência dos dados no PostgreSQL
- Design responsivo para diversos dispositivos

## Como rodar a aplicação :arrow_forward:

No terminal, clone o projeto: 

```
git clone https://github.com/luizcnn/projetoFinal-webModerno
```
Entre na pasta do projeto:

```
cd projetoFinal-webModerno
```
Entre na pasta do frontend

```
cd frontend
```

Instale as dependências via yarn ou npm:

```
yarn install
```
ou

```
npm install
```

Execute a aplicação via npm ou yarn

```
yarn serve
```
ou

```
npm run serve
```
Em uma nova aba do terminal, entre na pasta do backend

```
cd backend
```
Instale as dependências via yarn ou npm:

```
yarn install
```
ou

```
npm install
```
Em uma nova aba do terminal, com o PostgreSQL instalado e configurado na máquina, conecte-se a base de dados (Ambiente Linux):
```
sudo su - postgres
psql
\c knowledge
```
Em uma nova aba do terminal, com o MongoDb instalado e configurado na máquina, conecte-se a base de dados (Ambiente Linux):
```
sudo mongod
```
Em uma nova aba do terminal, inicialize o backend via npm ou yarn:

```
yarn start
```
ou

```
npm start
```

Agora é só acessar a aplicação através da url http://localhost:8080/

## Linguagens e Libs utilizadas :books:

### Frontend:
- [Vue](https://vuejs.org/)
- [Vuex](https://vuex.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [BootstrapVue](https://bootstrap-vue.org/)
- [Vue MQ (MediaQuery)](https://www.npmjs.com/package/vue-mq)
- [Vue Toasted](https://github.com/shakee93/vue-toasted)
- [Vue Gravatar](https://www.npmjs.com/package/vue-gravatar)
- [Vue2 Editor](https://www.vue2editor.com/)
- [Axios](https://github.com/axios/axios)
- [Font Awesome](https://fontawesome.com/)
- [Highlight.js](https://highlightjs.org/)
- [Liquor Tree](https://www.npmjs.com/package/liquor-tree)


### Backend:
- [Express](https://expressjs.com/pt-br/)
- [Body-parser](https://www.npmjs.com/package/body-parser)
- [Knex](http://knexjs.org/)
- [node-postgres](https://www.npmjs.com/package/pg)
- [Mongoose](https://www.npmjs.com/package/mongoose)
- [Cors](https://expressjs.com/en/resources/middleware/cors.html)
- [Consign](https://www.npmjs.com/package/consign)
- [Bcrypt.js](https://www.npmjs.com/package/bcryptjs)
- [Passport](https://www.npmjs.com/package/passport)
- [jwt-simple](https://www.npmjs.com/package/jwt-simple)
- [Moment.js](https://www.npmjs.com/package/moment)
- [PM2](https://www.npmjs.com/package/pm2)

