const DB = require('./index')
const Schema = DB.Schema

const UserSchema = new Schema({          
    userName : { type: String },                    //用户账号
    userpwd: {type: String},                        //密码
    userAge: {type: Number},                     //年龄
    logindate : { type: Date},                       //最近登录时间
    phone: { type: String }, // 电话号码
    email: { type: String }, // 邮箱
    role: { type: Array } // 用户角色
})
const user = DB.model('user', UserSchema)
module.exports = user