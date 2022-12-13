import teachers from '../Model/TeacherModel';
import jwt from 'jsonwebtoken';

//Teacher Login 
export const teacherLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const teacher = await teachers.findOne({ email });
        const isValid = (password, teacher.password);
     
        let payload = {};
        payload.id = teacher.id;
        payload.email = teacher.email;
        
        jwt.sign(payload, 'managementsystem', {
          "expiresIn": "24hr"
        },
          (err, token) => {
            if (isValid) {
              return res.send({ status: 200, message: "Login Success", result: token })
            } else {
              return res.send({ status: 401, message: "Login Failed", result: err })
            }
          }
        )
      } 
      catch (e) {
        return res.send({ status: false, message: "Error", code: 404 })
      }
  } 
 
//Teacher By Id  
  export const getTeacherbyid = async (req, res) => {
    try {
      var id = req.teacher.id;
      var teacherData = await teachers.findById(id)
      res.send({ "status": 200, "message": "Success", result: teacherData })
    }
    catch (e) {
      throw e
    }
  }
  