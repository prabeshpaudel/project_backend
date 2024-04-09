import express from 'express';
import Hello from './Hello.js';
import Lab5 from './lab5.js';
import CourseRoutes from './Kanbas/Courses/routes.js';
import ModuleRoutes from './Kanbas/Modules/routes.js';
import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import QuizRoutes from './Kanbas/Quizzes/routes.js';
import QuestionRoutes from './Kanbas/Questions/routes.js';
import UserRoutes from './Kanbas/Users/routes.js';
import cors from "cors";
import session from "express-session";
import "dotenv/config";

const app = express();
import mongoose from "mongoose";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
mongoose.connect(CONNECTION_STRING);
//const db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));

app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_URL,
    })
   );
   const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
    };
  }
  app.use(session(sessionOptions));
  
  
  
app.use(express.json());
AssignmentRoutes(app);
QuizRoutes(app);
QuestionRoutes(app);
ModuleRoutes(app);
CourseRoutes(app)
UserRoutes(app);
Hello(app);
Lab5(app);
app.listen(process.env.PORT || 4000);