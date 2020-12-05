const config = require('../knexfile.js')
const knex = require('knex')(config)

// Devemos ter cuidado ao inserir o carregamento das migrations direto na nossa aplicação
// Em sistemas maiores, isto pode fazer com que percamos o controle sobre os carregamentos
knex.migrate.latest([config]);

module.exports = knex