import express from "express";
import post_route from "./post_route";
const router = express.Router();

export default (): express.Router => {
  post_route(router);
  return router;
};
