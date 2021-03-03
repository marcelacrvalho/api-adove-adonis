'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Service extends Model {
    static get traits() {
        return ['App/Models/Traits/NoTimestamp']
    }
    
    store() {
        return this.belongsTo('App/Models/Store')
    }

    events() {
        return this.hasMany('App/Models/Event')
    }
}

module.exports = Service
