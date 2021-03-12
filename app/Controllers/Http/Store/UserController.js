'use strict'

const User = use('App/Models/User')

class UserController {
    async store({ request, response }) {
        try {
            const { email, password, role } = request.all()
            const newUser = User.create({ email, password, role })
            return response.status(201).send(newUser)
        } catch (error) {
            return response.status(400).send({
                message: 'Erro ao se conectar com o banco de dados'
            })
        }
    }

    async show({ params: { id }, request, response }) {
        const user = await User.findOrFail(id)
        return response.send(user)
    }

    async update({ params: { id }, request, response }) {
        const user = await User.findOrFail(id)
        try {
            const { email, password, role } = request.all()
            user.merge({ email, password, role })
            user.save()
            return response.send(user)
        } catch (error) {
            return response.status(400).send({
                message: 'Erro ao atualizar usuário'
            })
        }
    }

    async destroy({ params: { id }, request, response }) {
        const user = await User.findOrFail(id)
        try {
            await user.delete()
            return response.status(200).send({
                message: 'Deletado com sucesso!'
            })
        } catch (error) {
            return response.status(500).send({
                message: 'Erro ao excluir usuário'
            })
        }

    }
}

module.exports = UserController