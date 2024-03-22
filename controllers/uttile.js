const Dep = require('../models/deptModel');
const Doctor = require('../models/doctorModel')

module.exports.getDept =(req,res)=>{

    Dep.find().then(data=>{
        console.log(data);
        if(data.length<=0){
            return  res.status(200).json({message:'no_data'});
        }
        return  res.status(200).json({message:'success',data:data});
    }).catch(err=>{
        console.log(err);
    })
}


module.exports.getDoctor = (req,res)=>{
    Doctor.find({},{password:0}).populate({path:'dept',model:'Dept'}).then(data=>{
     if(!data){
        return  res.status(200).json({message:'no_data'});
     }
     res.status(200).json({message:'success',data:data});
    }).catch(err=>{
     res.status(400).json({message:'error'});
    })
 }