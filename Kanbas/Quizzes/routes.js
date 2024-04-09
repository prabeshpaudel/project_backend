import db from "../Database/index.js";
import * as dao from "./dao.js";

function QuizRoutes(app) {

    // app.post("/api/courses/:cid/quizzes", (req, res) => {
    //     const { cid } = req.params;
    //     const newQuiz= {...req.body, course: cid, _id: new Date().getTime().toString()};
    //     db.quizzes.push(newQuiz);
    //     console.log("Added Quiz==>"+req.body._id);
    //     res.send(newQuiz);
    // });


    app.post("/api/courses/:cid/quizzes", async (req, res) => {
        const { cid } = req.params;
        const quiz = await dao.createQuiz(cid, req.body);
        console.log("Added Quiz");
        res.json(quiz);
    });

    // app.put("/api/quizzes/:qid", (req, res) => {
    //     const { qid } = req.params;
    //     const quizIndex = db.quizzes.findIndex((q) => q._id === qid);
    //     if (quizIndex!==-1){
    //         db.quizzes[quizIndex] = {...db.quizzes[quizIndex],...req.body};
    //         console.log("Updated quizz id==>"+qid);
    //     }
    //     else {

    //         const newQuiz = { ...req.body, _id: new Date().getTime().toString()};
    //         db.quizzes.push(newQuiz);   
    //         console.log("Added quizz==>"+req.body._id);   
    //     }
    //     res.sendStatus(204);
    //   });


      app.put("/api/quizzes/:qid", async (req, res) => {
        const { qid } = req.params;
        const status = await dao.updateQuiz(qid, req.body);
        console.log("Updated quiz id==>"+qid);
        res.json(status);
     
      });
    
        
    // app.delete("/api/quizzes/:qid", (req, res) => {
    //     const { qid } = req.params;
    //     db.quizzes = db.quizzes.filter((q) => q._id !== qid);
    //     console.log("Deleted quiz id==>"+qid);
    //     res.sendStatus(200);
    // });


    app.delete("/api/quizzes/:qid", async (req, res) => {

        const status = await dao.deleteQuiz(req.params.qid);
        console.log("deleting quiz id==>"+req.params.qid);
        res.json(status);
  
    });
    
    // app.get("/api/courses/:cid/quizzes", (req, res) => {
    //     const { cid } = req.params;
    //     const quizzes = db.quizzes.filter((m) => m.course === cid);
    //     console.log("Fetched all quizzes");
    //     res.send(quizzes);
    // });

    app.get("/api/courses/:cid/quizzes", async (req, res) => {
        const { cid } = req.params;
        const quizzes = await dao.findQuizzesForCourse(cid);
        console.log("Fetched all Quizzes with dao");
        res.json(quizzes);
    });
}
export default QuizRoutes;
