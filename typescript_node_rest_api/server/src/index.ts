import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import router from "./routers";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server port: ${PORT}`);
  console.log(`Server link: http://localhost:${PORT}/`);
});

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/", router());
