const jwt = require ('jsonwebtoken');


//////////////////////////////////// Admin verify /////////////////////////////////////////////


module.exports.adminVerify =(req,res,next)=>{
    const token = req.headers.authorization;                                                     
    if(!token){
        return res.status(200).json({message:'token_error'});
    }

    jwt.verify(token,process.env.SECRET_KEY,(err,decode)=>{
        if(err){
            // console.log(err);
            return res.status(200).json({message:'verify_error'});
        }

        req.userData = decode;
        
        next();
    })
}


//////////////////////////////////// Doctor verify /////////////////////////////////////////////


module.exports.doctorVerify=(req,res,next)=>{
    const token = req.headers.authorization;

    if(!token){
        return res.status(200).json({message:'error'});
    }

    jwt.verify(token,process.env.SECRET_KEY_DOC,(err,decode)=>{
        if(err){
            return res.status(200).json({message:'verify_error'});
        }
        req.userData = decode;
        next();
    })
}


//////////////////////////////////// User verify /////////////////////////////////////////////


module.exports.userVerify=(req,res,next)=>{
    const token = req.headers.authorization;

    if(!token){
        return res.status(200).json({message:'error'});
    }

    jwt.verify(token,process.env.SECRET_KEY_USR,(err,decode)=>{
        if(err){
            return res.status(200).json({message:'verify_error'});
        }
        req.userData = decode;
        next();
    })
}