module.exports = app => {
    // Definindo o modelo do bando de dados nao relacional
    const Stat = app.mongoose.model('Stat', {
        users: Number,
        categories: Number,
        articles: Number,
        createdAt: Date
    })

    const get = (req, res) => {
        Stat.findOne({}, {}, {sort: {'createdAt': -1}})
            .then(stat => {
                const defaultStat = {
                    users: 0,
                    categories: 0,
                    articles: 0
                }

                res.json(stat || defaultStat)
            })
    }

    return { Stat, get }
}