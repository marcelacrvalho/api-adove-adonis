'use strict'

const Event = use('App/Models/Event')

class EventController {
    async index({ request, response }) {
        const search = request.input('search')
        const query = Event.query()
        if (search) {
            query.where('event_date', 'ILIKE', `%${search}%`)
        }
        const events = await query.orderBy('event_date', 'desc').fetch()
        return response.send(events)
    }

    async store({ request, response }) {
        try {
            const { store_id, client_id, service_id, event_date, hour, client_hour, status } = request.all()
            const event = Event.create({ store_id, client_id, service_id, event_date, hour, client_hour, status })
            return response.status(201).send(event)
        } catch (error) {
            return response.status(400).send({
                message: 'Erro ao se conectar com o banco de dados'
            })
        }
    }

    async show({ params: { id }, request, response }) {
        const event = await Event.findOrFail(id)
        return response.send(event)
    }

    async update({ params: { id }, request, response }) {
        const event = await Event.findOrFail(id)
        try {
            const { store_id, client_id, service_id, event_date, hour, client_hour, status } = request.all()
            event.merge({ store_id, client_id, service_id, event_date, hour, client_hour, status })
            event.save()
            return response.send(event)
        } catch (error) {
            return response.status(400).send({
                message: 'Erro ao atualizar evento'
            })
        }
    }

    async destroy({ params: { id }, request, response }) {
        const event = await Event.findOrFail(id)
        try {
            await event.delete()
            return response.status(200).send({
                message: 'Deletado com sucesso!'
            })
        } catch (error) {
            return response.status(500).send({
                message: 'Erro ao excluir evento'
            })
        }
    }
}

module.exports = EventController