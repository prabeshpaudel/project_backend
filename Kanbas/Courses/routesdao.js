//import Database from "../Database/index.js";
import * as dao from "./dao.js";
function CourseRoutes(app) {

    app.get("/api/author/:id/courses", async (req, res) => {
        console.log('Session ID:', req.sessionID);
        console.log('Session data:', req.session);
        const { id } = req.params;
        const courses = await dao.findCoursesByAuthor(id);
        res.json(courses);
      });
}

export default CourseRoutes;