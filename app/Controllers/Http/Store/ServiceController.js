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

  async store({ request, response }) {
    try {
      const { store_id, service, description, price_at, result } = request.all()
      const newService = await Service.create({ store_id, service, description, price_at, result })
      return response.status(201).send(newService)
    } catch (error) {
      return response.status(400).send({ message: 'Por favor, tente novamente!' })
    }
  }

  async show({ params: { id }, request, response, view }) {
    const service = await Service.findOrFail(id)
    return response.send(service)
  }

  async update({ params: { id }, request, response }) {
    const updateService = await Service.findOrFail(id)
    const { store_id, service, description, price_at, result } = request.only()
    service.merge({ store_id, service, description, price_at, result })
    await service.save()
    return response.send(updateService)
  }

  async destroy({ params: { id }, request, response }) {
    const service = await Service.findOrFail(id)
    await service.delete()
    return response.status(204).send({ message: 'Deletado com sucesso!' })
  }
}

module.exports = ServiceController