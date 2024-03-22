require('dotenv').config()
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL).then(info=>{
    console.log('connect');
}).catch(err=>{
    console.log(err);
})