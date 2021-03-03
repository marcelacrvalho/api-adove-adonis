'use strict'

const PaymentStoreHook = exports = module.exports = {}

PaymentStoreHook.calculatePaymentDate = async (model) => {
    const query = Database.from('payment_stores')
    if(model.$transaction) {
        query.transacting(model.$transaction)
    }
    await query.whereRaw('id', model.payment_store_id).increment('payment_date', 30)
}

