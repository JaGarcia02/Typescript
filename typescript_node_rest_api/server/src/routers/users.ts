import { isAuthenticated } from "../middlewares/index";
import { getAllUsers, deleteUser } from "../controllers/users";
import express from "express";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.delete("/users/:id", deleteUser);
};
