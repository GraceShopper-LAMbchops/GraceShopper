const Sequelize = require('sequelize')
const db = require('../db')

//defining our through table
const OrderProduct = db.define('order_product', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = OrderProduct
