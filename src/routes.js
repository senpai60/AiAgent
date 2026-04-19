import { Router } from "express";

const router = Router();

import promptRoutes from "./routes/prompt.routes.js";

router.use("/", promptRoutes);

export default router;
