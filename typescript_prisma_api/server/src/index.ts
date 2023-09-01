import "dotenv/config";
import express from "express";

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
