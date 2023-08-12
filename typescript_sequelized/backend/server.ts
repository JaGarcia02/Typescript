import expres from "express";
import db from "./models";
import dotenv from "dotenv";
dotenv.config();
import { users } from "./seeders/users";
import { projects } from "./seeders/project";

const app = expres();
const port = process.env.PORT || 9999;

// function create

const Create_Project = () => {
  projects.map((project) => db.Project.create(project));
};
Create_Project();
// const Create_Users = () => {
//   users.map((user) => db.User.create(user));
// };
// Create_Users();

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server port:${port}`);
  });
});
