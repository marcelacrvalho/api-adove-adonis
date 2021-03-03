'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Store extends Model {
    static get traits() {
        return ['App/Models/Traits/NoTimestamp']
    }
    
    user() {
        return this.belongsTo('App/Models/User')
    }

    services() {
        return this.hasMany('App/Models/Service')
    }

    events() {
        return this.hasMany('App/Models/Event')
    }

    paymentStore() {
        return this.hasOne('App/Models/PaymentStore')
    }
}

module.exports = Store