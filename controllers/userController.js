const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
const Book = require('../models/bookingModel');

module.exports.getDoctor=(req,res)=>{
    const {deptId}  = req.query;
    console.log(deptId)
    Doctor.find({dept:deptId},{password:0}).populate({path:'dept',model:'Dept'}).then(data=>{
        if(!data){
            return  res.status(200).json({message:'no_doctor'}); 
        }
        console.log(data)
        return  res.status(200).json({message:'success',data:data}); 
    }).catch(err=>{
        return  res.status(400).json({message:'error'}); 
    })
}

module.exports.getReport=(req,res)=>{

    const {repId} = req.query;

    Book.findById(repId).populate([{
        path:'userId',
        model:'User',
        select:['username','email','-_id']
    },
    {
        path:'docId',
        model:'Doctor',
        select:['username','-_id','email']
    },
    {
        path:'deptId',
        model:'Dept',
        select:['deptName','-_id']
    }
]).then(data=>{
        return res.status(200).json({message:'success',data}); 
    }).catch(err=>{
        return res.status(200).json({message:'error'}); 
    })

}

module.exports.getValidReports = (req,res)=>{
    Book.find({userId:req.userData.id,report:{$exists:true}}).populate([{
        path:'docId',
        model:'Doctor',
        select:'username'
    },{
        path:'deptId',
        model:'Dept',
        select:['deptName','-_id']
    }]).then(data=>{
        return res.status(200).json({message:'success',data}); 
    }).catch(err=>{
        return res.status(200).json({message:'error'}); 
    })
}

module.exports.getBooking=(req,res)=>{
    const {docId} = req.query;


    Doctor.findOne({_id:docId}).then(data=>{
        if(data.length<=0){
            return res.status(200).json({message:'no_data'}); 
        }

        const userBookings = data.appointments.filter(item=>item.patient == req.userData.id);

        return res.status(200).json({message:'success',data:userBookings}); 
    })
}

module.exports.getAllBooking=(req,res)=>{
   Book.find({ userId: req.userData.id}).populate([{path:'docId',model:'Doctor',select:'username'},{path:'deptId',model:'Dept'}]).then(data=>{
    return res.status(200).json({message:'success',data:data}); 
   }).catch(err=>{
    console.log(err);
   })
}



module.exports.addBooking=(req,res)=>{
    const {docId,date,deptId,age} = req.body;
    const newBooking  =new Book({
        userId: req.userData.id,
        docId:docId,
        deptId:deptId,
        bookDate:date,
        age:age
    });

    newBooking.save().then(info=>{
        return res.status(200).json({message:'success',data:info});
    }).catch(err=>{
        return res.status(200).json({message:'error'});

    });



}


module.exports.cancelBooking =(req,res)=>{
    const {id} =req.query;
    console.log(id);
    Book.findByIdAndDelete(id).then(info=>{
        console.log(info);
        return res.status(200).json({message:'success',data:info});
    }).catch(err=>{
        return res.status(200).json({message:'error'});
    })
}
