// Import express
import express from "express";
// Import cors
import cors from "cors";
// Import connection
// import db from "./config/database.js";
// Import router
// import Router from "./routes/routes.js";
import authFrontRouter from "./routes/frontRouters/authFrontRouter.js";
import postFrontRouter from "./routes/frontRouters/postFrontRouter.js";
import templateFrontRouter from "./routes/frontRouters/templateFrontRouter.js";
import templateFileFrontRouter from "./routes/frontRouters/templateFileFrontRouter.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import credentials from "./middleware/credentials.js";
import corsOptions from "./config/corsOptions.js";
import FileUpload from "express-fileupload";
dotenv.config();
// Init express
const app = express();
// use express json
app.use(express.json());
app.use(credentials);
// use cors
app.use(cors(corsOptions));
app.use(cookieParser());
// app.use(FileUpload());
app.use(express.static("public"));
// Testing database connection 
// try {
//     await db.authenticate();
//     console.log('Connection has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }
 
// use router
// app.use(Router);

app.use('/auth', authFrontRouter);
app.use('/post', postFrontRouter);
app.use('/template', templateFrontRouter);
app.use('/template-file', templateFileFrontRouter);


 
// listen on port
 app.listen(5000, () => console.log('Server running at http://localhost:5000'));
