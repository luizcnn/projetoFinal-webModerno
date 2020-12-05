const admin = require('./admin');

module.exports = app => {
    //Cuidado na ordenação de inserção das rotas! As mais específicas vem primeiro
    // Essas 3 primeiras rotas são as unicas que não passam pela validação/geração do token
    // São rotas públicas!
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(admin(app.api.user.get));

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))
        .get(admin(app.api.user.getUserById))
        .delete(admin(app.api.user.remove));

    app.route('/categories')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.category.save))
        .get(admin(app.api.category.get));
    
    app.route('/categories/tree')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getTree);

    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.category.save))
        .delete(admin(app.api.category.remove))
        .get(app.api.category.getById);

    app.route('/articles')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.article.save))
        .get(admin(app.api.article.get))

    app.route('/articles/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.article.save)
        .get(admin(app.api.article.getById))
        .delete(admin(app.api.article.remove))

    app.route('/categories/:id/articles')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getByCategory)

    app.route('/stats')
        .all(app.config.passport.authenticate())
        .get(app.api.stat.get)
}