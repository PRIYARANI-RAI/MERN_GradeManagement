
import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const studentSchema = new mongoose.Schema({
    teacherid:{
        type:mongoose.ObjectId
    },
    fullname: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    cls: {
        type: String,
        require: true,
        enum: ["8", "9", "10"]
    },
    image: {
        type: Array,
        require: true,
    },
    english: {
        type: Number,
        require: true,
    },
    maths: {
        type: Number,
        require: true,
    },
    science: {
        type: Number,
        require: true,
    },
    hindi: {
        type: Number,
        require: true,
    },
    grade: {
        type: String,
        require: true,
    },
    percentage: {
        type: String,
        require: true,
    }
});
studentSchema.plugin(paginate);
const studentdata = mongoose.model("Student", studentSchema);

export default studentdata;