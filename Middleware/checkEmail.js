import Student from '../Model/AddMarksModel';

export const CheckMail = async (req,res,next)=>{

    const result = await Student.findOne({email:req.body.email});

    if(!result){
        next();
    }
    else{
        res.send({
            status:false,
            message:"Email Alredy Registered!!!!"
        })
    }
}