'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.resource('/stores', 'StoreController').apiOnly()
    Route.resource('/users', 'UserController').apiOnly()
    Route.resource('/services', 'ServiceController').apiOnly()
    Route.resource('/events', 'EventController').apiOnly()
}).prefix('v1/client').namespace('Client')