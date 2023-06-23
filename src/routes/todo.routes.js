import controller from "../controllers/todo.controller.js";
import { Router } from "express";

const router = Router();

// CREATE
router.post("/", controller.create);

// READ
router.get("/", controller.all);
router.get("/:id", controller.one);

// UPDATE
router.put("/:id", controller.update);

// DELETE
router.delete("/:id", controller.remove);

export default router;
