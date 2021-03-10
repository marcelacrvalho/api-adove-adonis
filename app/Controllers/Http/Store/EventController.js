'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Event = use('App/Models/Event')

class EventController {
  async index({ request, response, view }) {
    const name = request.input('name')
    const query = Event.query()
    if (name) {
      query.where('name', 'ILIKE', `%${name}%`)
    }
    const events = await query.with('service').with('client').fetch()
    return response.send(events)
  }

  async show({ params: { id }, request, response, view }) {
    const event = await Event.findOrFail(id).with('service').with('client')
    return response.send(event)
  }

  async destroy({ params: { id }, request, response }) {
    const event = await Event.findOrFail(id)
    await event.delete()
    return response.status(204).send({ message: 'Deletado com sucesso!' })
  }
}

module.exports = EventController