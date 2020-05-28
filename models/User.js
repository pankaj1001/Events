let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let User = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    email:{
        type:String,
        requird:true,
        unique:true,
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    pass:{
        type: String,
        required:true
    }
});

module.exports = mongoose.model('User',User);