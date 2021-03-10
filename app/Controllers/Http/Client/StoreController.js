'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Store = use('App/Models/Store')

class StoreController {
    async index({ request, response, view }) {
        const search = request.input('category')
        const query = Store.query()
        if (search) {
            query.where('category', 'ILIKE', `%${search}%`)
            query.orWhere('name', 'ILIKE', `%${search}%`)
            query.orWhere('city', 'ILIKE', `%${search}%`)
        }
        const stores = await query.with('services').fetch()
        return response.send(stores)
    }

    async show({ params: { id }, request, response, view }) {
        const store = await Store.findOrFail(id).with('services')
        return response.send(store)
    }
}

module.exports = StoreController