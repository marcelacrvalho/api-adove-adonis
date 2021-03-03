'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventSchema extends Schema {
  up () {
    this.create('events', (table) => {
      table.increments()
      table.integer('store_id').unsigned().notNullable()
      table.integer('client_id').unsigned().notNullable()
      table.integer('service_id').unsigned().notNullable()
      table.date('event_date').notNullable()
      table.enu('hour', ['09:30', '10:30', '11:30', '13:30', '14:30', '16:00', '17:30', '18:00'])
      table.integer('client_hour').defaultTo(0)
      table.enu('status', ['Cancelado', 'Aguardando', 'Concluído']).defaultTo(['Aguardando'])
      table.timestamps()

      table.foreign('store_id').references('id').inTable('stores').onDelete('cascade').onUpdate('cascade')
      table.foreign('client_id').references('id').inTable('clients').onDelete('cascade').onUpdate('cascade')
      table.foreign('service_id').references('id').inTable('services').onDelete('cascade').onUpdate('cascade')
    })
  }

  down () {
    this.drop('events')
  }
}

module.exports = EventSchema
