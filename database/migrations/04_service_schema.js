'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceSchema extends Schema {
  up () {
    this.create('services', (table) => {
      table.increments()
      table.integer('store_id').unsigned().notNullable()
      table.string('service', 25).notNullable()
      table.string('price_from', 30)
      table.string('description', 30)
      table.string('result', 35)

      table.foreign('store_id').references('id').onTable('stores').onDelete('cascade').onUpdate('cascade')
    })
  }

  down () {
    this.drop('services')
  }
}

module.exports = ServiceSchema
