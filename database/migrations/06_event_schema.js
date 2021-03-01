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
      table.enu('status', ['Cancelado', 'Aguardando', 'Concluído']).defaultTo(['Aguardando'])
      table.timestamps()

      table.foreign('store_id').references('id').onTable('stores').onDelete('cascade').onUpdate('cascade')
      table.foreign('client_id').references('id').onTable('clients').onDelete('cascade').onUpdate('cascade')
      table.foreign('service_id').references('id').onTable('services').onDelete('cascade').onUpdate('cascade')
    })
  }

  down () {
    this.drop('events')
  }
}

module.exports = EventSchema
