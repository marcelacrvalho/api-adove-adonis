'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Service = use('App/Models/Service')

class ServiceController {
    async index({ request, response, view }) {
        const service = request.input('service')
        const query = Service.query()
        if (service) {
            query.where('service', 'ILIKE', `%${service}%`)
        }
        const services = await query.fetch()
        return response.send(services)
    }

    async show({ params: { id }, request, response, view }) {
        const service = await Service.findOrFail(id).with('store')
        return response.send(service)
    }
}

module.exports = ServiceController