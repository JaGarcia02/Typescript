import express from "express";
import {
  getPost,
  createPost,
  updatePost,
  deletePost,
  getPostbyId,
} from "../controllers/post_controller";

export default (router: express.Router) => {
  router.get("/post", getPost);
  router.get("/post/:id", getPostbyId);
  router.post("/post", createPost);
  router.patch("/post/:id", updatePost);
  router.delete("/post/:id", deletePost);
};
