'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaymentStoreSchema extends Schema {
  up () {
    this.create('payment_stores', (table) => {
      table.increments()
      table.integer('store_id').unsigned().notNullable()
      table.date('payment_date')
      table.boolean('is_pay').defaultTo(false)
      table.timestamps()

      table.foreign('store_id').references('id').inTable('stores').onDelete('cascade').onUpdate('cascade')
    })
  }

  down () {
    this.drop('payment_stores')
  }
}

module.exports = PaymentStoreSchema
