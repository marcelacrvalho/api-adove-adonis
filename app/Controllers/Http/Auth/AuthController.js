'use strict'

const Database = use('Database')
const User = use('App/Models/User')

class AuthController {
    async register({ request, response }) {
        const trx = await Database.beginTransaction()
        try {
            const { email, password, role } = request.all()
            const user = await User.create( { email, password, role })
            await trx.commit()
            return response.status(201).send(user)
        } catch (error) {
            trx.rollback()
            return response.status(400).send({
                message: "Erro ao se conectar com o banco de dados"
            })
        }
    }

    async login({ request, response, auth }) {
        const {email, password} = request.all()
        let data = await auth.withRefreshToken().attempt(email, password)
        return response.send(data)

    }

    async refresh({ request, response, auth }) {
        var refresh_token = request.input('refresh_token')
        if(!refresh_token) {
            refresh_token = request.header('refresh_token')
        }
        const user = await auth.newRefreshToken().generateForRefreshToken(refresh_token)
        return response.send(user)
    }

    async logout({ request, response, auth }) {
        let refresh_token = request.input('refresh_token')
        if(!refresh_token) {
            refresh_token = request.header('refresh_token')
        }
        await auth.authenticator('jwt').revokeTokens([refresh_token], true)
        return response.status(200).send({
            message: 'Usuário deslogado'
        })
    }
}

module.exports = AuthController
