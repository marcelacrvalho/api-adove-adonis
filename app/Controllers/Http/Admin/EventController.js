'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Event = use('App/Models/Event')

class EventController {
  async index({ request, response, view }) {
    const events = await Event.query().with('service').with('store').fetch()
    return response.send(events)
  }

  async store({ request, response }) {
    try {
      const { store_id, client_id, service_id, date, time, status } = request.all()
      const event = await Event.create({ store_id, client_id, service_id, date, time, status })
      return response.status(201).send(event)
    } catch (error) {
      return response.status(400).send({ message: 'Por favor, tente novamente!' })
    }
  }

  async show({ params: { id }, request, response, view }) {
    const event = await Event.findOrFail(id).with('store').with('service')
    return response.send(event)
  }

  async destroy({ params: { id }, request, response }) {
    const event = await Event.findOrFail(id)
    await event.delete()
    return response.status(204).send({ message: 'Deletado com sucesso!' })
  }
}

module.exports = EventController