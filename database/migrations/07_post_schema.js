'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.integer('store_id').unsigned().notNullable()
      table.string('title', 50).notNullable()
      table.string('content', 500).notNullable()
      table.timestamps()

      table.foreign('store_id').references('id').inTable('stores').onDelete('cascade').onUpdate('cascade')
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostSchema
