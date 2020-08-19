const DB = require('./index')
const Schema = DB.Schema

const productListSchema = new Schema({          
  id: { type: String },
  productId: { type: String },
  name: { type: String },
  imageUrl: { type: String },
  price: { type: Number },
  originalPrice: { type: String }
})
const productDetailSchema = new Schema({          
  // id: { type: String },
  // productId: { type: String }
})
const productList = DB.model('product_list', productListSchema, 'product_list')
const productDetail = DB.model('product_detail', productDetailSchema, 'product_detail')
module.exports = {
  productList,
  productDetail
}
