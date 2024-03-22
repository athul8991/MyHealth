const mongoose = require('mongoose');

const deptSchema = new mongoose.Schema({
    deptName:{
        type:String,
        required:true
    }
});

module.exports = new mongoose.model('Dept',deptSchema);