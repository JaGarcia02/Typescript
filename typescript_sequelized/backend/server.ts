import expres from "express";
import db from "./models";
const app = expres();
const port = process.env.PORT || 9999;

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server port:${port}`);
  });
});
