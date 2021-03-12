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
      table.date('event_date')
      table.string('hour', 5)
      table.integer('client_hour').defaultTo(0)
      table.string('status', 20).defaultTo('Aguardando')
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
