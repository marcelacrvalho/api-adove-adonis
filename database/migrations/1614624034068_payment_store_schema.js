'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaymentStoreSchema extends Schema {
  up () {
    this.create('payment_stores', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('payment_stores')
  }
}

module.exports = PaymentStoreSchema
