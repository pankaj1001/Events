const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Events = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:true
    },
    user_id:mongoose.Schema.Types.ObjectId,
    desc:String,
    date:{
        type:Date,
        default:new Date
    }
});

module.exports = mongoose.model('Event',Events);