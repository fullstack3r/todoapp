import authenticate from "../middlewares/auth.middleware.js";

import { Router } from "express";
import controller from "../controllers/todo.controller.js";

const router = Router();

// CREATE
router.post("/", authenticate, controller.create);

// READ
router.get("/", controller.all);
router.get("/:id", controller.one);

// UPDATE
router.put("/:id", authenticate, controller.update);

// DELETE
router.delete("/:id", authenticate, controller.remove);

export default router;
