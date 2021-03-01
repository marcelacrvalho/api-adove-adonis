'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StoreSchema extends Schema {
  up () {
    this.create('stores', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.string('name').notNullable()
      table.string('homecare', 3).defaultTo('Não')
      table.enu('open_at', ['De seg a sex, exceto feriados', 'De seg a sab, exceto feriados', 'Todos os dias'])
      table.enu('payment_type', ['Pix e dinheiro', 'Pix, dinheiro e cartão', 'Apenas dinheiro'])
      table.string('state', 2).notNullable().defaultTo('MG')
      table.string('city', 35).notNullable()
      table.string('neighborhood', 35)
      table.string('street', 35)
      table.string('number', 10)
      table.string('reference', 25)

      table.foreign('user_id').references('id').inTable('users').onDelete('cascade').onUpdate('cascade')
    })
  }

  down () {
    this.drop('stores')
  }
}

module.exports = StoreSchema
