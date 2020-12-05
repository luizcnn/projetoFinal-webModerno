const { authSecret } = require('../.env');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        if(!req.body.email || !req.body.password) {
            return res.status(400).send("Informe o usuário e senha.")
        }

        const user = await app.db('users')
                        .where('email', req.body.email)
                        .first()

        if(!user) {
            return res.status(400).send("Usuário não encontrado")
        }
        // compara a senha passada no login com a senha criptografada no db
        const isMatch = bcrypt.compareSync(req.body.password, user.password)

        if(!isMatch) {
            return res.status(401).send("Usuário ou senha inválidos")
        }

        const now = Math.floor(Date.now()/1000)
        
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: now, // iat significa 'emitido em'. É um padrão do jwt para saber quando o token foi gerado
            exp: now + (60*60*24*3), // token válido por 3 dias. exp tb é um padrão do jwt
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })

    }

    const validateToken = async (req, res) => {
        const userData = req.body || null
        try {
            if(userData) {
                const token = jwt.decode(userData.token, authSecret)
                if(new Date(token.exp * 1000) > new Date()) {
                    return res.send(true) // Aqui, poderíamos renovar o token, ao inves de ficar limitado a 3 dias
                }
            }
        } catch (e) {
            //problema com o token. Ex: token expirado, token gerado com authSecret diferente
        }

        res.send(false)
    }

    return { signin, validateToken }
}