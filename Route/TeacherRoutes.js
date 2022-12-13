import express from 'express';
import { teacherLogin,getTeacherbyid } from '../Controller/TeacherController';
import {studentAdd,getStudentDetailList,getStudentDataById,studentDelete,updatestudent} from '../Controller/AddMarksController'
import { verifytoken } from '../Middleware/verifyToken';
import { upload } from '../Middleware/uploadfile';
import { CheckMail} from '../Middleware/checkEmail'
const router = express.Router();

router.post('/Login',teacherLogin)
router.get("/getteacherbyid",verifytoken,getTeacherbyid)

router.post("/studentAdd",upload.single('image'),CheckMail,studentAdd)
router.get("/getStudentDataList",getStudentDetailList)
router.get("/getStudentDataById",getStudentDataById)
router.put("/updatestudent",upload.single('image'),updatestudent)
router.delete("/getstudentdelete/:id",studentDelete)

export default router;