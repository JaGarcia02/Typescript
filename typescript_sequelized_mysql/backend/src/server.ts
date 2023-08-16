import express from "express";
import dotenv from "dotenv";
import db from "./models";
dotenv.config();
const app = express();
const port = process.env.PORT || 9999;

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server port: ${port}`);
  });
});
