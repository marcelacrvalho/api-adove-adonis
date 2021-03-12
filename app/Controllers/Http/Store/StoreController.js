'use strict'

const Store = use('App/Models/Store')

class StoreController {
    async index({ request, response }) {
        const search = request.input('search')
        const query = Store.query()
        if (search) {
            query.where('name', 'ILIKE', `%${search}%`)
        }
        const stores = await query.fetch()
        response.send({stores})
    }

    async store({ request, response }) {
        try {
            const { user_id, name, category, homecare, open_at, payment_type, state, city, neighborhood, street, number, reference } = request.all()
            const newStore = Store.create({ user_id, name, category, homecare, open_at, payment_type, state, city, neighborhood, street, number, reference })
            return response.status(201).send(newStore)
        } catch (error) {
            return response.status(400).send({
                message: 'Erro ao se conectar com o banco de dados'
            })
        }
    }

    async show({ params: { id }, request, response }) {
        const store = await Store.findOrFail(id)
        return response.send({store})
    }

    async update({ params: { id }, request, response }) {
        const store = await Store.findOrFail(id)
        try {
            const { user_id, name, category, homecare, open_at, payment_type, state, city, neighborhood, street, number, reference } = request.all()
            store.merge({ user_id, name, category, homecare, open_at, payment_type, state, city, neighborhood, street, number, reference })
            store.save()
            return response.send({store})
        } catch (error) {
            return response.status(400).send({
                message: 'Erro ao atualizar'
            })
        }
    }

    async destroy({ params: { id }, request, response }) {
        const store = await Store.findOrFail(id)
        try {
            await store.delete()
            return response.status(200).send({
                message: 'Deletado com sucesso!'
            })
        } catch (error) {
            return response.status(500).send({
                message: 'Erro ao excluir'
            })
        }
    }
}

module.exports = StoreController