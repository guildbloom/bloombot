import express from "express";
import logger from "firebase-functions/logger";
import { onRequest } from "firebase-functions/v2/https";

import { SecretsDependency } from "./app";

import "./bot";

import router from "./router";

const app = express();

app.use(express.json());

app.use("/api", router);
app.use("/**", (r, res) => {
  logger.info("Hit 404, redirecting to home");
  res.redirect("/");
});

export default {
  bot: onRequest({ secrets: SecretsDependency }, app),
};
