import db from "../Database/index.js";
import * as dao from "./dao.js";

function QuestionRoutes(app) {

    // app.post("/api/courses/:cid/quizzes/:qid/questions", (req, res) => {
    //     const { cid } = req.params;
    //     const { qid } = req.params;
    //     const newQuestion = {...req.body, course: cid, quiz: qid, _id: new Date().getTime().toString()};
    //     db.quizzes.push(newQuestion);
    //     console.log("Added Question==>"+req.body._id);
    //     res.send(newQuestion);
    // });

    app.post("/api/courses/:cid/quizzes/:qid/questions", async (req, res) => {
        const { cid } = req.params;
        const { qid } = req.params;
        const question = await dao.createQuestion(cid, qid, req.body);
        console.log("Added question");
        res.json(question );
      });

    // app.put("/api/questions/:quid", (req, res) => {
    //     const { quid } = req.params;
    //     const questionIndex = db.questions.findIndex((q) => q._id === quid);
    //     if (questionIndex!==-1){
    //         db.questions[questionIndex] = {...db.questions[questionIndex],...req.body};
    //         console.log("Updated question id==>"+quid);
    //     }
    //     else {

    //         const newQuestion = { ...req.body, _id: new Date().getTime().toString()};
    //         db.questions.push(newQuestion);   
    //         console.log("Added question==>"+req.body._id);   
    //     }
    //     res.sendStatus(204);
    //   });

    app.put("/api/questions/:quid", async (req, res) => {
      const { quid } = req.params;
      const status = await dao.updateQuestion(quid, req.body);
      console.log("Updated question id==>"+quid);
      res.json(status);
   
    });
    
        
    // app.delete("/api/questions/:quid", (req, res) => {
    //     const { quid } = req.params;
    //     db.questions = db.questions.filter((q) => q._id !== quid);
    //     console.log("Deleted question id==>"+quid);
    //     res.sendStatus(200);
    // });


    app.delete("/api/questions/:quid", async (req, res) => {
        const status = await dao.deleteQuestion(req.params.quid);
        console.log("deleting question id==>"+req.params.quid);
        res.json(status);
  
      });
    
    // app.get("/api/courses/:cid/quizzes/:qid/questions", (req, res) => {
    //     const { cid } = req.params;
    //     const { qid } = req.params;
    //     const questions = db.questions.filter((m) => m.course === cid && m.quiz === qid);
    //     console.log("Fetched all questions");
    //     res.send(questions);
    // });

    app.get("/api/courses/:cid/quizzes/:qid/questions", async (req, res) => {
      const { cid, qid } = req.params;
      try {
          const questions = await dao.findQuestionsForQuiz(cid, qid);
          console.log(`Fetched ${questions.length}`);
          
          // Loop through each question and log it
          // questions.forEach((question, index) => {
          //     console.log(`Question ${index + 1}:`, question.name);
          //     console.log(`Question ${index + 1}:`, question.description);
          // });
  
          res.json(questions);
      } catch (error) {
          console.error("Error fetching questions:", error);
          res.status(500).send("An error occurred while fetching questions.");
      }
  });


    // app.get("/api/courses/:cid/quizzes/:qid/questions/:id", (req, res) => {
    //     const { cid } = req.params;
    //     const { qid } = req.params;
    //     const { id } = req.params;
    //     const question = db.questions.filter((m) => m.course === cid && m.quiz === qid && m._id === id);
    //     if (!question) {
    //       res.status(404).send("Question not found");
    //       return;
    //     }
    //     console.log("Fetched question==>"+id);
    //     res.send(question);
    //   });


    
}
export default QuestionRoutes;