const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const Admin = require('../models/adminModel')
const User = require('../models/userModel')
const Doctor = require('../models/doctorModel')



//////////////////////////////////////////// admin auth start /////////////////////////////////////////////////////////////


module.exports.adminLogin =(req,res)=>{
    const {username,password} = req.body;
    console.log(req.body);
    Admin.findOne({username:username}).then(data=>{
        console.log(data);
        if(!data){
            return res.status(200).json({message:'no_user'});
        }

        bcrypt.compare(password,data.password).then(info=>{
            if(!info){
                console.log(info);
                return res.status(200).json({message:'incorrect inputs'});
            }

            jwt.sign({user:data.username,adminId:data._id,isAdmin:true},process.env.SECRET_KEY,(err,token)=>{
                if(err){
                    console.log(err);
                    return res.status(200).json({message:'error'});
                }

                return res.status(200).json({message:'success',token:token});
            })
        })

    }).catch(err=>{
        console.log(err);
        res.status(200).json({message:'error'});
    })

}

module.exports.adminReg = (req,res)=>{
    const {username,password} =req.body;

    bcrypt.hash(password,10).then(hash=>{
        if(!hash){
            return res.status(200).json({message:'error'});
        }

        const newAdmin = new Admin ({
            username:username,
            password:hash,
            dept:[]
        });

        return newAdmin.save()

    }).then(info=>{
        res.status(200).json({message:'success'});
    }).catch(err=>{
        console.log(err);
        res.status(200).json({message:'error 2'});
    })
   

}


//////////////////////////////////////////// Doctor auth start /////////////////////////////////////////////////////////////


module.exports.doctorChange =(req,res)=>{

    const {password} = req.body;
    Doctor.findById(req.userData.id).then(data=>{
        if(!data){
            return   res.status(200).json({message:'no_user'});
        }
        bcrypt.hash(password,10).then(hash=>{
            data.password = hash;
            return data.save()
        }).then(info=>{
            return   res.status(200).json({message:'success',data:info});
        })
    }).catch(err=>{
        return   res.status(200).json({message:'error'});
    })
}


module.exports.doctorLogin =(req,res)=>{
    const {email,password} = req.body;

    Doctor.findOne({email:email}).then(data=>{
        if(!data){
         return   res.status(200).json({message:'no_user'});
        }
        bcrypt.compare(password,data.password).then(info=>{
            if(!info){
                return res.status(200).json({message:'not_logged'});
            }

            jwt.sign({email:data.email,uname:data.username,id:data._id,isDoctor:true},process.env.SECRET_KEY_DOC,(err,token)=>{
                if(err){
                    return res.status(200).json({message:'not_logged'});
                }

                return res.status(200).json({message:'success',token:token});

            })

        }).catch(err=>{
          
        })
    }).catch(err=>{
        res.status(200).json({message:'error'});
    })

}


//////////////////////////////////////////// User auth start /////////////////////////////////////////////////////////////


module.exports.userReg =(req,res)=>{
    const {email,password,username} = req.body;
    User.findOne({email:email}).then(data=>{
        if(data){
          return  res.status(200).json({message:'exists'});
        }

        bcrypt.hash(password,12).then(hash=>{

            if(!hash){
                return  res.status(200).json({message:'error'});
            }
            
            const newUser=new User({
                username:username,
                password:hash,
                email:email
            });

            newUser.save().then(info=>{
                return  res.status(200).json({message:'success'});
            }).catch(err=>{
                return  res.status(200).json({message:'error'});
            })
        })

    }).catch(err=>{
        res.status(200).json({message:'error'});
    })

}


module.exports.userLogin =(req,res)=>{
    const {email,password} = req.body;
   
    User.findOne({email:email}).then(data=>{
        if(!data){
           return res.status(200).json({message:'not_user'});
        }

        bcrypt.compare(password,data.password).then(info=>{
            if(!info){
               return res.status(200).json({message:'not_logged'});
            }

            jwt.sign({username:data.username,email:data.email,id:data._id,isUser:true},process.env.SECRET_KEY_USR,(err,token)=>{
                if(err){
                    return res.status(200).json({message:'not_logged'});
                }

                return res.status(200).json({message:'success',token:token});
            })
        })

    }).catch(err=>{
        return res.status(200).json({message:'error'});
    })

}