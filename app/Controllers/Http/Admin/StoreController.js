'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Store = use('App/Models/Store')
const Database = use('Database')

class StoreController {
    async index({ request, response, view }) {
        const stores = await Store.query().with('services').fetch()
        return response.send(stores)
    }

    async store({ request, response }) {
        const trx = await Database.beginTransaction()
        try {
            const { user_id, name, category, homecare, open_at, state, city, neighborhood, street, number, reference, payment_type } = request.all()
            const newStore = await Store.create({ user_id, name, category, homecare, open_at, state, city, neighborhood, street, number, reference, payment_type })
            await trx.commit()
            return response.status(201).send(newStore)
        } catch (error) {
            await trx.rollback()
            return response.status(400).send({ message: 'Por favor, tente novamente!' })
        }
    }

    async show({ params: { id }, request, response, view }) {
        const store = await Store.findOrFail(id).with('services').fetch()
        return response.send(store)
    }

    async update({ params: { id }, request, response }) {
        const store = await Store.findOrFail(id)
        const { user_id, name, category, homecare, open_at, state, city, neighborhood, street, number, reference, payment_type } = request.only()
        store.merge({ user_id, name, category, homecare, open_at, state, city, neighborhood, street, number, reference, payment_type})
        await store.save()
        return response.send(store)
    }

    async destroy({ params: { id }, request, response }) {
        const store = await Store.findOrFail(id)
        await store.delete()
        return response.status(204).send({ message: 'Deletado com sucesso!' })
    }
}

module.exports = StoreController