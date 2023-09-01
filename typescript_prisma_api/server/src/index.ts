import "dotenv/config";
import express from "express";
import router from "./routes";

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router());

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
