const DB = require('./index')
const Schema = DB.Schema

const productListSchema = new Schema({          
  id: { type: String },
  productId: { type: String }
})
const productDetailSchema = new Schema({          
  id: { type: String },
  productId: { type: String }
})
const productList = DB.model('product_list', productListSchema)
const productDetail = DB.model('product_detail', productDetailSchema)
module.exports = {
  productList, productDetail
}
