const Doctor = require('../models/doctorModel');
const Book =require('../models/bookingModel');

module.exports.addSchedule = (req,res)=>{
     const {date}=req.body;
     let check = null
     
     Doctor.findById(req.userData.id).then(data=>{
        if(!data){
            return res.status(200).json({message:'no_Data'}); 
        }

         check =data.schedule.find(item=>item.date == date);

         if(check){
            return res.status(200).json({message:'exists'}); 
         }

        data.schedule.push({date:date});
        data.save().then(info=>{
            res.status(200).json({message:'success',data:info});
        }).catch(err=>{
            res.status(400).json({message:'error1'});
        })
     }).catch(err=>{
        res.status(400).json({message:'error2'});
     })
}

module.exports.getSchedule = (req,res)=>{
    
    Doctor.findById(req.userData.id,{schedule:1}).then(data=>{
        if(data.length<=0){
           return res.status(200).json({message:'no_data'}); 
        }
        return res.status(200).json({message:'success',data:data}); 
        
    }).catch(err=>{
        res.status(400).json({message:'error'}); 
    })
     
}


module.exports.deleteSchedule = (req,res)=>{
    const {shId} = req.query;
    Doctor.findById(req.userData.id).then(data=>{
        if(!data){
            res.status(200).json({message:'no_data'});   
        }

        const deletedArray = data.schedule.filter(item=>item._id!=shId);

        data.schedule = deletedArray;
        data.save().then(info=>{
            res.status(200).json({message:'success',data:info});   

        }).catch(err=>{
            res.status(400).json({message:'error'});   
        })
    }).catch(err=>{
        res.status(400).json({message:'error'});   
})
}


module.exports.getUser = (req,res)=>{

    Book.find({ docId:req.userData.id}).populate({path:'userId',model:'User',select:['username','email']}).then(data=>{
        res.status(200).json({message:'success',data:data});  
    }).catch(err=>{
        res.status(200).json({message:'error'});  
    })
     
}

module.exports.addReport = (req,res)=>{
    const { content ,repId}=req.body;

    Book.findById(repId).then(data=>{
        if(!data){
            return res.status(200).json({message:'no_data'}); 
        }
        data.report = content;
        data.save().then(info=>{
            return res.status(200).json({message:'success'}); 
         } ).catch(err=>{
            return res.status(200).json({message:'not_save'}); 
         })

    }).catch(err=>{
        return res.status(200).json({message:'error'}); 
    }) 
}
module.exports.getReport = (req,res)=>{
    const {usrId}  =req.query;
    Book.findById(usrId).then(data=>{
        if(!data){
            return res.status(200).json({message:'no_data'}); 
        }
        return res.status(200).json({message:'success',data:data.report}); 
    }).catch(err=>{
        return res.status(200).json({message:'error'}); 
    })
}
