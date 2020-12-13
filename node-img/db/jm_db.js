/**
 * @description 积木数据
 * @author CHI
 */

const DB = require('./index')
const Schema = DB.Schema

const jmSchema = new Schema({})
const jmData = DB.model('jimu', jmSchema, 'jimu')

module.exports = {
  jmData
}