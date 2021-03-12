'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StoreSchema extends Schema {
  up () {
    this.create('stores', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.string('name', 40).notNullable()
      table.string('category', 20).notNullable()
      table.string('homecare', 3).defaultTo('Não')
      table.string('open_at', 40).defaultTo('De seg a sex, exceto feriados')
      table.string('payment_type', 30).defaultTo('Pix e dinheiro')
      table.string('state', 2).notNullable().defaultTo('MG')
      table.string('city', 40).notNullable()
      table.string('neighborhood', 40)
      table.string('street', 40)
      table.string('number', 10)
      table.string('reference', 40)

      table.foreign('user_id').references('id').inTable('users').onDelete('cascade').onUpdate('cascade')
    })
  }

  down () {
    this.drop('stores')
  }
}

module.exports = StoreSchema
