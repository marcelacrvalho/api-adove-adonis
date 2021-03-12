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
        response.send(stores)
    }

    async show({ params: { id }, request, response }) {
        const store = await Store.findOrFail(id)
        return response.send(store)
    }
}

module.exports = StoreController