'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceSchema extends Schema {
  up () {
    this.create('services', (table) => {
      table.increments()
      table.integer('store_id').unsigned().notNullable()
      table.string('service', 40)
      table.string('price_from', 50)
      table.string('description', 70)

      table.foreign('store_id').references('id').inTable('stores').onDelete('cascade').onUpdate('cascade')
    })
  }

  down () {
    this.drop('services')
  }
}

module.exports = ServiceSchema
