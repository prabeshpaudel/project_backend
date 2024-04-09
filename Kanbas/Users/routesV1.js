import * as dao from "./dao.js";
import session from "express-session";
//let currentUser = null;
export default function UserRoutes(app) {
  
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    console.log("creating user")
    res.json(user);
  };

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
};

  const findAllUsers = async (req, res) => {
    const { role } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
  };
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    console.log("finding user by id")
    res.json(user);
  };

  const updateUser = async (req, res) => { };

  // const signup = async (req, res) => {
  //   const user = await dao.findUserByUsername(
  //     req.body.username);
  //   if (user) {
  //     res.status(400).json(
  //       { message: "Username already taken" });
  //   }
  //   currentUser = await dao.createUser(req.body);
  //   res.json(currentUser);
  // };

  const signup = (req, res) => {
    const username = req.body.username;
    const user = dao.findUserByUsername(username);
    if (user) {
      res.sendStatus(409);
      return;
    }
    const newUser = usersDao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };
 


  const signin = async (req, res) => {
    const { username, password } = req.body;
    currentUser = await dao.findUserByCredentials(username, password);
    res.json(currentUser);
  };


  const signout = (req, res) => {
    currentUser = null;
    res.json(200);
  };
 

  const profile = async (req, res) => {
    res.json(currentUser);
  };

 




  app.post("/api/users", createUser);
  app.delete("/api/users/:userId", deleteUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/profile", profile);
  app.post("/api/users/signout", signout);
}

