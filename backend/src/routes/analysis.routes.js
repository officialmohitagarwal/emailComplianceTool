import express from "express";

import { validateEmail } from "../middlewares/validateEmail.js";
import { analyzeEmail } from "../controllers/analysis.controller.js";

const router = express.Router();

router.post(
    "/analyze",
    validateEmail,
    analyzeEmail
);

export default router;