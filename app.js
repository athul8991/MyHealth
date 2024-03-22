require('dotenv').config();
require('./conn');
const express = require('express');
const port = process.env.PORT ||8000;
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')

const adminRoute = require('./routes/adminRoute');
const userRoute =require('./routes/userRouter');
const doctorRoute = require('./routes/doctorRoute');

const deptController = require('./controllers/uttile')

const guardRoute = require('./routes/guardRoute')

const app =express();


app.use(cors());
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());


app.use('/api/user',userRoute);
app.use('/api/admin',adminRoute);

app.get('/api/dept',deptController.getDept)

app.use('/api/doctor',doctorRoute);

app.use('/api/guard',guardRoute);

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.listen(port,()=>{
    console.log(`server @${port}`);
})