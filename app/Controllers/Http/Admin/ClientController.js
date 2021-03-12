'use strict'

const Client = use('App/Models/Client')

class ClientController {
    async index({ request, response }) {
        const search = request.input('search')
        const query = Client.query()
        if (search) {
            query.where('name', 'ILIKE', `%${search}%`)
        }
        const clients = await query.fetch()
        response.send(clients)
    }

    async store({ request, response }) {
        try {
            const { user_id, name, state, city, neighborhood, street, number, reference } = request.all()
            const client = Client.create({ user_id, name, state, city, neighborhood, street, number, reference })
            return response.status(201).send(client)
        } catch (error) {
            return response.status(400).send({
                message: 'Erro ao se conectar com o banco de dados'
            })
        }
    }

    async show({ params: { id }, request, response }) {
        const client = await Client.findOrFail(id)
        return response.send(client)
    }

    async update({ params: { id }, request, response }) {
        const client = await Client.findOrFail(id)
        try {
        const { name, state, city, neighborhood, street, number, reference } = request.all()
        client.merge({ name, state, city, neighborhood, street, number, reference })
        client.save()
        return response.send(client)
        } catch (error) {
            return response.status(400).send({
                message: 'Erro ao atualizar usuário'
            })
        }
    }

    async destroy({ params: { id }, request, response }) {
        const client = await Client.findOrFail(id)
        try {
            await client.delete()
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

module.exports = ClientController