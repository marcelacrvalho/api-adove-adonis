'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PaymentStore extends Model {
    static boot() {
        super.boot()
        this.addHook('afterSave', 'PaymentStoreHook.calculatePaymentDate')
    }

    static get dates() {
        return super.dates.concat(['payment_date'])
    }

    static castDates(field, value) {
        if (field === 'payment_date') {
            return value.format('DD-MM-YYYY')
        }
    }

    store() {
        return this.belongsTo('App/Models/Store')
    }
}

module.exports = PaymentStore
