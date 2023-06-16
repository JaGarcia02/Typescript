import { isAuthenticated, isOwner } from "../middlewares/index";
import { getAllUsers, deleteUser, updateUser } from "../controllers/users";
import express from "express";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
  router.put("/users/:id", isAuthenticated, isOwner, updateUser);
};
