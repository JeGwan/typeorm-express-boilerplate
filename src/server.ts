import dotenv from "dotenv";
// 환경변수 불러오기
dotenv.config();
import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import cors from "cors";
import path from "path";
import users from "./routers/users";
createConnection()
  .then(async () => {
    const port = process.env.PORT || 4000;
    const app = express();
    app.use(cors());
    app.use("/public", express.static(path.join(__dirname, "public")));
    app.use("/users", users);
    app.listen({ port }, () => console.log(`🚀 http://localhost:${port}`));
  })
  .catch(console.error);
