const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },

    schedule  :[
        {
            date:String,
        }
    ],
    
    dept:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Dept'
    }
});


module.exports = new mongoose.model('Doctor',doctorSchema);