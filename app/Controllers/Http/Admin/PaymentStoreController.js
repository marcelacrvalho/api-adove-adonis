'use strict'

const PaymentStore = use('App/Models/PaymentStore')

class PaymentStoreController {
    async index({ request, response, view }) {
        const paymentDate = request.input('payment_date')
        const query = User.query()
        if (paymentDate) {
            query.where('paymentDate', 'ILIKE', `%${paymentDate}%`)
        }
        const paymentStore = await query().fetch()
        return response.send(paymentStore)
    }

    async store({ request, response }) {
        try {
            const { store_id, paymentDate, isPay } = request.all()
            const paymentStore = await PaymentStore.create({ store_id, paymentDate, isPay })
            return response.status(201).send(paymentStore)
        } catch (error) {
            return response.status(400).send({ message: 'Por favor, tente novamente!' })
        }
    }

    async show({ params: { id }, request, response, view }) {
        const paymentStore = await PaymentStore.findOrFail(id).fetch()
        return response.send(paymentStore)
    }

    async update({ params: { id }, request, response }) {
        const paymentStore = await User.findOrFail(id)
        const { store_id, paymentDate, isPay } = request.only()
        paymentStore.merge({ store_id, paymentDate, isPay })
        await paymentStore.save()
        return response.send(paymentStore)
    }

    async destroy({ params: { id }, request, response }) {
        const paymentStore = await PaymentStore.findOrFail(id)
        await paymentStore.delete()
        return response.status(204).send({ message: 'Deletado com sucesso!' })
    }
}

module.exports = PaymentStoreController