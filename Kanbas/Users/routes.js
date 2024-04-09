import * as dao from "./dao.js";
import session from "express-session";

export default function UserRoutes(app) {
  
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    console.log("creating user");
    res.json(user);
  };

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.id);

    console.log("deleting user id==>"+req.params.id);
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
    const user = await dao.findUserById(req.params.id);
    console.log("finding user by id");
    res.json(user);
  };

  const updateUser = async (req, res) => {
    console.log('Session ID:', req.sessionID);
    console.log('Session data:', req.session);
    const { id } = req.params;
    console.log("updating id==>"+id);
    const status = await dao.updateUser(id, req.body);
   // const currentUser = await dao.findUserById(id);
    //req.session['currentUser'] = currentUser;
    res.json(status);
  };

  const signup = async (req, res) => {
    console.log('Session ID:', req.sessionID);
    console.log('Session data:', req.session);
    const username = req.body.username;
    const user = await dao.findUserByUsername(username);
    if (user) {
      res.sendStatus(409);
      return;
    }
    const newUser = await dao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };

  const signin = async (req, res) => {

    console.log('Session ID:', req.sessionID);
    console.log('Session data:', req.session);
    const username = req.body.username;
    const password = req.body.password;
    const user = await dao.findUserByCredentials(username, password);
    if (!user) {
        res.sendStatus(404);
        console.log("user not found");
        return;
    }
    req.session["currentUser"] = user;
    console.log("user found==>"+req.session["currentUser"].username);
    res.json(user);
  };

  const signout = (req, res) => {
    console.log('Session ID:', req.sessionID);
    console.log('Session data:', req.session);
    req.session.destroy((err) => {
      if (err) {
        res.status(500).send("Could not sign out, please try again.");
      } else {
        res.sendStatus(200);
      }
    });
  };

  const profile = async (req, res) => {
    console.log('Session ID:', req.sessionID);
    console.log('Session data:', req.session);
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
        console.log("user not found in profile");
        res.sendStatus(404);
        return;
    }
    console.log("user found in profile");
    res.json(currentUser);
  };

  app.post("/api/users", createUser);
  app.delete("/api/users/:id", deleteUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:id", findUserById);
  app.put("/api/users/:id", updateUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/profile", profile);
  app.post("/api/users/signout", signout);
}
