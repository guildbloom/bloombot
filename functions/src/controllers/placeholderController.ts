import { Router } from "express";

const router = Router();

router.get("/placeholder", (req, res) => {
  res.json(true);
});

export default router;
