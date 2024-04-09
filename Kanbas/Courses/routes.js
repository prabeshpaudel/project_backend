import Database from "../Database/index.js";
import * as dao from "./dao.js";
function CourseRoutes(app) {


  app.get("/api/author/:id/courses", async (req, res) => {
    console.log('Session ID:', req.sessionID);
    console.log('Session data:', req.session);
    const { id } = req.params;
    const courses = await dao.findCoursesByAuthor(id);
    res.json(courses);
  });

  // app.get("/api/courses", (req, res) => {
  //   const courses = Database.courses;
  //   console.log("Fetched all db courses");
  //   res.send(courses);
  // });
  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    console.log("Fetched all db courses");
    res.json(courses);
  };

  app.get("/api/courses", findAllCourses);


  // app.put("/api/courses/:id", (req, res) => {
  //   const { id } = req.params;
  //   const course = req.body;
  //   Database.courses = Database.courses.map((c) =>  c._id === id ? { ...c, ...course } : c );
  //   console.log("Updated course id==>"+id);
  //   res.sendStatus(204);
  // });



  const updateCourse = async (req, res) => {
    const { id } = req.params;
    const status = await dao.updateCourse(id, req.body);
    console.log("Updated course id==>"+id);
    res.json(status);
  };

  app.put("/api/courses/:id", updateCourse);

  // app.post("/api/courses", (req, res) => {
  //   const course = { ...req.body, _id: new Date().getTime().toString() };
  //   console.log("Added course==>"+req.body._id);
  //   Database.courses.push(course);
  //   res.send(course);
  // });

  const createCourse = async (req, res) => {
    const course = await dao.createCourse(req.body);
    console.log("Added course");
    res.json(course);
  };

  app.post("/api/courses", createCourse);

  
  // app.delete("/api/courses/:id", (req, res) => {
  //   const { id } = req.params;
  //   Database.courses = Database.courses.filter((c) => c._id !== id);
  //   console.log("Deleted course id==>"+id);
  //   res.sendStatus(204);
  // });

  const deleteCourse = async (req, res) => {
    const status = await dao.deleteCourse(req.params.id);

    console.log("deleting course id==>"+req.params.id);
    res.json(status);
  };

  app.delete("/api/courses/:id", deleteCourse);




  // app.get("/api/courses/:id", (req, res) => {
  //   const { id } = req.params;
  //   const course = Database.courses.find((c) => c._id === id);
  //   if (!course) {
  //     res.status(404).send("Course not found");
  //     return;
  //   }
  //   console.log("Fetched db course==>"+id);
  //   res.send(course);
  // });


  const findCourseById = async (req, res) => {
    const course = await dao.findCourseById(req.params.id);
    console.log("finding course by id");
    res.json(course);
  };

  app.get("/api/courses/:id", findCourseById);


}

export default CourseRoutes;