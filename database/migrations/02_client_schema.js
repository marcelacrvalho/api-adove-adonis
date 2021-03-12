'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.string('name').notNullable()
      table.string('state', 2).defaultTo('MG')
      table.string('city', 40)
      table.string('neighborhood', 40)
      table.string('street', 40)
      table.string('number', 10)
      table.string('reference', 40)

      table.foreign('user_id').references('id').inTable('users').onDelete('cascade').onUpdate('cascade')
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientSchema
