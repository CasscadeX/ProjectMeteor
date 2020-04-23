const jwt = require('jsonwebtoken')



module.exports = async (req,res,next)=>{
//    getting token
    const token = req.header('x-auth-token')

    if(!token){
        return res.status(401).json({msg:"No token found authorization denied"})
    }

    try{
        const decoded = jwt.verify(token,"secret")

        req.user = decoded.user
        next()
    }catch(err){
        res.status(401).json({msg: "Token is not valid"})
    }

}