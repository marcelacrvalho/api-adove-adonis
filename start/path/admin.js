'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.resource('stores', 'EventController').apiOnly()
    Route.resource('clients', 'ClientController').apiOnly()
    Route.resource('users', 'UserController').apiOnly()
    Route.resource('payment-stores', 'PaymentStoreController').apiOnly()
    Route.resource('events', 'EventController').apiOnly()
}).prefix('v1/admin').namespace('Admin')