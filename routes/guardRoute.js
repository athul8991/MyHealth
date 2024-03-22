const express = require('express');
const router = express.Router();
const verify = require('../controllers/verify')

router.get('/admin-guard',verify.adminVerify,(req,res)=>{
    
    if(req.userData.isAdmin){
       return res.status(200).json(true);
    }else{
        return res.status(200).json(false);
    }


})
router.get('/user-guard',verify.userVerify,(req,res)=>{
    if(req.userData.isUser){
        return res.status(200).json(true);
     }else{
         return res.status(200).json(false);
     }

})
router.get('/doctor-guard',verify.doctorVerify,(req,res)=>{

    if(req.userData.isDoctor){
        return res.status(200).json(true);
     }else{
         return res.status(200).json(false);
     }

})

module.exports = router;