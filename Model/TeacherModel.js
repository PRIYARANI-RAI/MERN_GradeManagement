
import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({

email:{
    type:String,
    require:true,
},
password:{
    type:String,
    require:true,
}
});
const admindata = mongoose.model("teachers",adminSchema);

export default admindata;