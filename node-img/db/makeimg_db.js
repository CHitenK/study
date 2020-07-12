const DB = require('./index')
const Schema = DB.Schema

const MakeImgSchema = new Schema({          
    id: { type: String },
    creatTime: {type: Number}, 
    updateTime: {type: Number},
    creatName : { type: String}, 
    editor: { type: String},
    isUse: { type: Boolean, default: false },
    bgData: { type: Object, default: {} },
    normalOpt: { type: Array, default: [] },
    textOpt: { type: Array, default: [] }
})
const makeimg = DB.model('makeimg', MakeImgSchema)
module.exports = makeimg