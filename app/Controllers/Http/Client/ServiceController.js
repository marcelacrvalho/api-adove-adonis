'use strict'

const Service = use('App/Models/Service')

class ServiceController {
    async index({ request, response }) {
        const search = request.input('search')
        const query = Service.query()
        if (search) {
            query.where('service', 'ILIKE', `%${search}%`)
        }
        const services = await query.fetch()
        response.send(services)
    }

    async show({ params: { id }, request, response }) {
        const service = await Service.findOrFail(id)
        return response.send(service)
    }
}

module.exports = ServiceController