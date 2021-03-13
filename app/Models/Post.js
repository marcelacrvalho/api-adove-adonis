'use strict'

const Model = use('Model')

class Post extends Model {
    store() {
        return this.belongsTo('App/Models/Store')
    }
}

module.exports = Post
