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
        return response.send({ services })
    }

    async store({ request, response }) {
        try {
            const { store_id, service, price_from, description, result } = request.all()
            const newService = Service.create({ store_id, service, price_from, description, result })
            return response.status(201).send({ newService })
        } catch (error) {
            return response.status(400).send({
                message: 'Erro ao se conectar com o banco de dados'
            })
        }
    }

    async show({ params: { id }, request, response }) {
        const service = await Service.findOrFail(id)
        return response.send({ service })
    }

    async update({ params: { id }, request, response }) {
        const updateService = await Service.findOrFail(id)
        try {
            const { store_id, service, price_from, description, result } = request.all()
            updateService.merge({ store_id, service, price_from, description, result })
            updateService.save()
            return response.send({ updateService })
        } catch (error) {
            return response.status(400).send({
                message: 'Erro ao atualizar'
            })
        }
    }

    async destroy({ params: { id }, request, response }) {
        const service = await Service.findOrFail(id)
        try {
            await service.delete()
            return response.status(200).send({
                message: 'Deletado com sucesso!'
            })
        } catch (error) {
            return response.status(500).send({
                message: 'Erro ao deletar serviço'
            })
        }
    }
}

module.exports = ServiceController