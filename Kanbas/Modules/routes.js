import db from "../Database/index.js";
import * as dao from "./dao.js";
function ModuleRoutes(app) {

    // app.put("/api/modules/:mid", (req, res) => {
    //     const { mid } = req.params;
    //     const moduleIndex = db.modules.findIndex((m) => m._id === mid);
    //     db.modules[moduleIndex] = {...db.modules[moduleIndex],...req.body};
    //     console.log("Updated module id==>"+mid);
    //     res.sendStatus(204);
    //   });

  app.put("/api/modules/:mid", async (req, res) => {
    const { mid } = req.params;
    const status = await dao.updateModule(mid, req.body);
    console.log("Updated module id==>"+mid);
    res.json(status);
 
  });


    
    
    //   app.delete("/api/modules/:mid", (req, res) => {
    //     const { mid } = req.params;
    //     db.modules = db.modules.filter((m) => m._id !== mid);
    //     console.log("Deleted module id==>"+mid);
    //     res.sendStatus(200);
    // });

    app.delete("/api/modules/:mid", async (req, res) => {

      const status = await dao.deleteModule(req.params.mid);
      console.log("deleting module id==>"+req.params.mid);
      res.json(status);

    });
  
    
      // app.post("/api/courses/:cid/modules", (req, res) => {
      //   const { cid } = req.params;
      //   const newModule = {...req.body, course: cid, _id: new Date().getTime().toString()};
      //   db.modules.push(newModule);
      //   console.log("Added module==>"+toString(req.body));
      //   res.send(newModule);
      //   });


    app.post("/api/courses/:cid/modules", async (req, res) => {
      const { cid } = req.params;
      const module = await dao.createModule(cid, req.body);
      console.log("Added Module");
      res.json(module);
    });

    
    // app.get("/api/courses/:cid/modules", (req, res) => {
    //     const { cid } = req.params;
    //     const modules = db.modules.filter((m) => m.course === cid);
    //     console.log("Fetched all modules");
    //     res.send(modules);
    // });

    app.get("/api/courses/:cid/modules", async (req, res) => {
      const { cid } = req.params;
      const modules = await dao.findModulesForCourse(cid);
      console.log("Fetched all modules");
      res.json(modules);
  });

}
export default ModuleRoutes;