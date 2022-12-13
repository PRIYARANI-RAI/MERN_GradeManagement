import express from 'express'
const app = express();
import cors from 'cors';

//imported mongoConnection function
import {mongoConnection} from './databaseFile'
mongoConnection();

import teacher from './Route/TeacherRoutes';

import bodyParser from 'body-parser';

app.use(cors({origin:'*'}));
app.use("/upload", express.static("uploads"));
app.use(bodyParser.urlencoded(
    {
        extended:true
    }
));
app.use(bodyParser.json());

app.use("/teacher",teacher)

export default app;