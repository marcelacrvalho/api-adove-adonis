'use strict'

const Database = use('Database')

const EventHook = exports = module.exports = {}

EventHook.incrementClient = async (model) => {
    const query = Database.from('events')
    if(model.$transaction) {
        query.transacting(model.$transaction)
    }
    await query.where('id', model.event_id).increment('client_hour', 1)
}

EventHook.decrementClient = async (model) => {
    const query = Database.from('events')
    if(model.$transaction) {
        query.transacting(model.$transaction)
    }
    await query.where('id', model.event_id).decrement('client_hour', 1)
}