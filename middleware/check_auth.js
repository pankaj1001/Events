const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        const decoded=jwt.verify(token,'secret');
        res.userData=decoded;
        next();
    }catch(error){
        return res.status(500).json({
            message:'Auth failed'
        })
     };
}