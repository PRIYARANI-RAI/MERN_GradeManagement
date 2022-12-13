import Student from '../Model/AddMarksModel'
import { SendEmail } from '../Middleware/sendMail';
import mongoose from 'mongoose';
import fs from 'fs'

//Add Student Mark
export const studentAdd = async (req, res) => {
    try {
        let total = parseInt(req.body.english) + parseInt(req.body.maths) +
            parseInt(req.body.science) + parseInt(req.body.hindi);
        let percentage = (total / 400) * 100;

        let grade;

        if (percentage >= 90) {
            grade = "A++";
        } else if ((percentage <= 89) & (percentage >= 80)) {
            grade = "A+";
        } else if ((percentage <= 79) & (percentage >= 70)) {
            grade = "B+";
        } else if ((percentage <= 69) & (percentage >= 50)) {
            grade = "B";
        } else if ((percentage <= 49) & (percentage >= 49)) {
            grade = "C";
        } else if (percentage < 35) {
            grade = "FAIL";
        }
        const studentdetail = new Student({
            fullname: req.body.fullname,
            email: req.body.email,
            cls: req.body.cls,
            english: req.body.english,
            maths: req.body.maths,
            science: req.body.science,
            hindi: req.body.hindi,
            image: req.file.filename,
            percentage: percentage + "%",
            grade: grade,
        })
        const adddata = await studentdetail.save()
       
        if (adddata) {
            res.send({
                status: true,
                message: 'Added Student',
                data: {
                    path: "http://localhost:8802/upload/" + req.file.filename
                },
                result:adddata
            })
            SendEmail(
                'xxxxxxxxxxx@gmail.com',
                req.body.email,
                `Welcome ${adddata.fullname}`,
                `Marksheet!!
                    Class : ${adddata.cls}
                    English Marks : ${adddata.english}
                    Maths Marks : ${adddata.maths}
                    Science Marks : ${adddata.science}
                    Hindi Marks : ${adddata.hindi}
                    Percentage : ${adddata.percentage}
                    Grade : ${adddata.grade}`
            );
        }
    }
    catch (e) {
        return res.send({ status: false, message: "Error", code: 404 })
    }
}

// Show detail list
export const getStudentDetailList = async (req, res) => {
    try {
        let studentDetailData = await Student.find()
        for (let key in studentDetailData) {
            studentDetailData[key].image = `http://localhost:8802/upload/${studentDetailData[key].image}`
        }
        res.send({ status: true, message: "Stuent Detail List", code: 200, result: studentDetailData })
    }
    catch (e) {
        return res.send({ status: false, message: "Error", code: 404 })
    }
}

//Show Student By Id
export const getStudentDataById = async (req, res) => {
    try {
        const { _id } = req.query;
        console.log(_id);
        const studentData = await Student.findById(_id);
        res.send({ status: true, message: "Student Data", code: 200, data: studentData })
    }
    catch (e) {
        return res.send({ status: false, message: "Error", code: 404 })
    }
}

//Update Student
export const updatestudent = async (req, res) => {

    try {
        let total = parseInt(req.body.english) + parseInt(req.body.maths) +
        parseInt(req.body.science) + parseInt(req.body.hindi);
    let percentage = (total / 400) * 100;

    let grade;

    if (percentage >= 90) {
        grade = "A++";
    } else if ((percentage <= 89) & (percentage >= 80)) {
        grade = "A+";
    } else if ((percentage <= 79) & (percentage >= 70)) {
        grade = "B+";
    } else if ((percentage <= 69) & (percentage >= 50)) {
        grade = "B";
    } else if ((percentage <= 49) & (percentage >= 49)) {
        grade = "C";
    } else if (percentage < 35) {
        grade = "FAIL";
    }
        let jsondata = {};

        if (req.body.fullname) {
            jsondata.fullname = req.body.fullname;
        }
        if (req.body.email) {
            jsondata.email = req.body.email;
        }
        if (req.body.cls) {
            jsondata.cls = req.body.cls;
        }
        if (req.file.filename) {
            jsondata.image = req.file.filename;
        }

        if (req.body.english) {
            jsondata.english = req.body.english;
        }
        if (req.body.maths) {
            jsondata.maths = req.body.maths;
        }
        if (req.body.science) {
            jsondata.science = req.body.science;
        }
        if (req.body.hindi) {
            jsondata.hindi = req.body.hindi;
        }
        if (percentage) {
            jsondata.percentage = percentage + "%";
        }
        if (grade) {
            jsondata.grade = grade;
        }
        console.log("id data", req.body.id)
        const updated = Student.updateOne({ _id: mongoose.Types.ObjectId(req.body.id) },
            { $set: jsondata },
            { new: true },
            (err, result) => {

                console.log(result)
                if (err) {
                    res.send({ status: 404, message: "Failed", result: err })
                } else {
                    res.send({ status: 200, message: "Updated Successfully", result: result })
                }
            }
        )
        SendEmail(
            'xxxxxxxxxxx@gmail.com',
             req.body.email,
            `Welcome ${updated.fullname}`,
            `Marksheet!!
                Class : ${updated.cls}
                English Marks : ${updated.english}
                Maths Marks : ${updated.maths}
                Science Marks : ${updated.science}
                Hindi Marks : ${updated.hindi}
                Percentage : ${updated.percentage}
                Grade : ${updated.grade}`
        );
    }
    catch (e) {
        throw e
    }
}

//Delete Student
export const studentDelete = async (req, res) => {
    var id = req.params.id;
    const studentDetails = await Student.findById(id)
    if (studentDetails) {
        var studentImage = studentDetails.image;
        const result = await Student.deleteOne({ _id: mongoose.Types.ObjectId(id) })
        if (result) {
            fs.unlinkSync('./uploads/' + studentImage, (err => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("File Deleted")
                }
            }))

            res.send({ status: 200, "message": "Deleted", result: result })
        }
        else {
            res.send({ status: 400, "message": "something went wrong" })
        }
    }
    else {
        res.send({ status: 202, "message": "invalid id" })
    }
}