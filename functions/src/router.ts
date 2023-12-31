import { Router } from "express";
import placeholderController from "./controllers/placeholderController";

const router = Router();

router.get("/ping", (r, res) => {
  res.json("Pong!");
});

router.use(placeholderController);

export default router;
