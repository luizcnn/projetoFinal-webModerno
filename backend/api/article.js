const queries = require('./queries');

module.exports = app => {
    const { existsOrError } = app.api.validation

    const updateOrInsertArticle = (article, req, res) => {
        if(article.id) {
            app.db('articles')
                .update(article)
                .where('id', article.id)
                .then(() => res.status(204).send())
                .catch((err) => res.status(500).send(err))
        } else {
            app.db('articles')
                .insert(article)
                .then(() => res.status(204).send())
                .catch((err) => res.status(500).send(err))
        }
    }

    const save = (req, res) => {

        const article = { ...req.body }

        if(req.params.id) {
            article.id = req.params.id
        }

        try {
            existsOrError(article.name, "Nome não informado")
            existsOrError(article.description, "Descrição não informada")
            existsOrError(article.content, "Conteúdo não informado")
            existsOrError(article.userId, "Autor não informado")
            existsOrError(article.categoryId, "Categoria não informada")

            // const user = await app.db('users').where('id', article.userId).first()
            // const category = await app.db('categories').where('id', article.categoryId).first()
            
            // existsOrError(user, "Usuário não cadastrado")
            // existsOrError(category, "Categoria não cadastrada")

        } catch (msg) {
            return res.status(400).send(msg)
        }        

        updateOrInsertArticle(article, req, res)

        
    }

    const remove = async (req, res) => {
        const articleId = req.params.id
        
        if(!Number.isInteger(parseInt(articleId)) || parseInt(articleId) < 0) {
            return res.status(400).send("Id inválido")
        } 

        try {
            const rowsDeleted = await app.db('articles').where('id', articleId).del()
            existsOrError(rowsDeleted, "Artigo não encontrado")
            res.status(204).send()
        } catch(msg) {
            return res.status(400).send(msg)
        }
    }

    const limit = 5 // Limite de itens para a paginação

    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('articles').count('id').first()
        const count = parseInt(result.count)

        app.db('articles')
            .select('id', 'name', 'description')
            .limit(limit)
            .offset(page * limit - limit)
            .then(articles => res.json({ data: articles, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('articles')
            .where('id', req.params.id)
            .first()
            .then(article => {
                article.content = article.content.toString()
                return res.json(article)
            })
            .catch(err => res.status(500).send(err))
    }

    const getByCategory = async (req, res) => {
        const categoryId = req.params.id
        const page = req.query.page || 1
        const categories = await app.db.raw(queries.categoryWithChildren, categoryId)

        const ids = categories.rows.map(c => c.id)
        // Consulta na tabela articles e users em uma só consulta
        // Usando o alias a e u para articles e users, respectivamente.
        app.db({a: 'articles', u: 'users'})
            .select('a.id', 'a.name', 'a.description', 'a.imageUrl', { author: 'u.name' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['u.id', 'a.userId']) // Verifica se o id do usuário corresponde ao id do autor do artigo
            .whereIn('categoryId', ids)
            .orderBy('a.id', 'desc')
            .then(articles => res.json(articles))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById, getByCategory }
}