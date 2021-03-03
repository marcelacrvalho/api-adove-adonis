'use strict'

const Model = use('Model')

class Event extends Model {
    static boot() {
        super.boot()
        this.addHook('afterSave', 'EventHook.incrementClient')
        this.addHook('afterDelete', 'EventHook.decrementClient')
    }

    static get dates() {
        return super.dates.concat(['date'])
    }

    static castDates(field, value) {
        if (field === 'date') {
            return value.format('DD-MM-YYYY')
        }
    }

    client() {
        return this.belongsTo('App/Models/Client')
    }

    store() {
        return this.belongsTo('App/Models/Store')
    }

    service() {
        return this.belongsTo('App/Models/Service')
    }
}

module.exports = Event
