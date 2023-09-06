import expres from "express";
import db from "./models";
import dotenv from "dotenv";
dotenv.config();
import { users } from "./seeders/users";
import { projects } from "./seeders/project";
import { projectAssignments } from "./seeders/projectAssignments";

const app = expres();
const port = process.env.PORT || 9999;

// function create

// const Create_ProjectAssignments = () => {
//   projectAssignments.map((projectAssign) =>
//     db.ProjectAssignment.create(projectAssign)
//   );
// };
// Create_ProjectAssignments();
// const Create_Project = () => {
//   projects.map((project) => db.Project.create(project));
// };
// Create_Project();
// const Create_Users = () => {
//   users.map((user) => db.User.create(user));
// };
// Create_Users();

app.get("/", (req, res) => {
  db.User.findAll({
    include: {
      model: db.Project,
    },
  })
    .then((response: object) => {
      res.status(200).json(response);
    })
    .catch((err: object) => {
      res.status(500).json(err);
    });
});

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server port:${port}`);
  });
});
