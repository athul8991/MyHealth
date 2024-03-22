
const crypto = require('crypto');
const bcrypt = require('bcrypt')

const mailer = require('./mailer');

const Admin = require('../models/adminModel');
const Doctor = require('../models/doctorModel');
const Dept = require('../models/deptModel')

module.exports.addDoctor =(req,res)=>{
    const {name,email,deptId} = req.body;

    Doctor.findOne({email:email}).then(inf=>{
        if(inf){
           return res.status(200).json({message:'already exist'});
        }
        crypto.randomBytes(5,(err,buffer)=>{
            if(err){
               
            }
            const password = buffer.readUInt32BE(0).toString(32).slice(0,6);
    
            bcrypt.hash(password,10).then(hash=>{
                // console.log(hash);
                const newDoctor = new Doctor({
                    username:name,
                    email:email,
                    dept:deptId,
                    password:hash
                });
    
                newDoctor.save().then(info=>{
                const mailOption = mailer.mailoption;
                 mailOption.to = email;
                 mailOption.subject='Register successfull mail';
                 mailOption.html =`<div style="margin: auto; width: 200px;background-color: azure; padding:10px;border-radius:25px">
                 <div style="width: 80%;  margin: auto; text-align:left;">
                     <h2 style=" background-color: aliceblue;">myhealth registration success</h2>
                     <hr>
                     <div >
                         <p><strong>username:</strong><em>${email}</em></p>
                         <p><strong>password:</strong><em>${password}</em></p>
             
                     </div>
                    
                 </div>
                 <div style="background-color: rgb(250, 184, 184);color: red;padding: 5px;">
                     <p>Please change the password when you login</p>
                 </div>
             </div>`;
                    mailer.sendMaile(mailOption);
    
                     res.status(200).json({message:'success',data:{name:info.name,email:info.email,id:info._id}});
    
                   
                }).catch(err=>{
                    console.log(err);
                    return  res.status(200).json({message:'error'});
                })
            }).catch(err=>{
                return  res.status(200).json({message:'error'});
            })
        });
    }).catch(err=>{
        return res.status(200).json({message:'error'});
    })

  
}

module.exports.deleteDoctor = (req,res)=>{

    const{id} = req.query;
    console.log(id);
    Doctor.findByIdAndDelete(id).then(info=>{
        res.status(200).json({message:'success',data:info});
    }).catch(err=>{
        res.status(200).json({message:'error'});
    })
}

module.exports.addDept =(req,res)=>{
   const {deptName} =req.body;

   Dept.findOne({deptName:deptName}).then(data=>{
    if(data){
        return  res.status(200).json({message:'already exist' });
    }
    const newDept = new Dept({
        deptName:deptName
    });
    newDept.save().then(info=>{
        return  res.status(200).json({message:'success',data:info});
    })
   }).catch(err=>{
    return  res.status(200).json({message:'error'});
   })
}


module.exports.deleteDept =(req,res)=>{
    const{deptId} = req.query;

    Dept.findByIdAndDelete(deptId).then(info=>{
        return  res.status(200).json({message:'success'});
    }).catch(err=>{
        return  res.status(200).json({message:'error'});
    })
}




