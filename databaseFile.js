import mongoose from "mongoose";

//Used configData file 
const db = require('./configData/config').get('local').DB
// console.log(db)

//mongodb Url
const mongoDbUrl = `mongodb://${db.HOST}:${db.PORT_NO}/${db.DBNAME}`

//Credential
const userCredit = {
    user:db.USERNAME,
    pass:db.PASSWORD
}

export const mongoConnection =async () => {
try{

    //mongoose.connect 
        await mongoose.connect(mongoDbUrl,userCredit)
        console.log("Connecton Successfull")
}
catch(e)
{
throw e
}
}