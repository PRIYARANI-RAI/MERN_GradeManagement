import jwt from 'jsonwebtoken'

export const verifytoken = async (req,res,next) => {
    try{
var token = req.header("Authorization")
let jwtsecretkey = "managementsystem";
if(!token){
    res.send({"status":202,"message":"invalid token"})
}
const decode = jwt.verify(token,jwtsecretkey);

req.teacher = decode;

next();
    }
    catch(e){
        return res.send({status:"400",message:"Failed",result:e})
    }
}