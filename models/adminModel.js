const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username :{
        type:String,
        required:true
    },
    password:{
        type:String,
        require:true
    }
})

module.exports =  mongoose.model('admin',adminSchema);

// db.admin.updateOne({ _id:"65bb75e7454a037961719278"},{$set:{dept:['name']}})
