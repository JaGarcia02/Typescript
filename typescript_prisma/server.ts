// https://www.youtube.com/watch?v=PM58NEMJgMw&ab_channel=rithmic 11:28 18:48
// npx prisma db push

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
dotenv.config();
if (!process.env.PORT) {
  process.exit(1);
}
// const PORT: number = parseInt(process.env.PORT as string, 10);
const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
