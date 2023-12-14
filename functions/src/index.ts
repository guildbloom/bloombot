import express from "express";
import cors from "cors";
import morgan from "morgan";
import { onRequest } from "firebase-functions/v2/https";

import { SecretsDependency } from "./app";

import "./bot";

import router from "./router";

const app = express();

app.use(express.json());
app.use(morgan("short"));
app.use(cors());
app.use("/bot/api", router);
app.use("/**", (r, res) => {
  res.status(404).json("");
});

export default {
  bot: onRequest({ secrets: SecretsDependency }, app),
};
