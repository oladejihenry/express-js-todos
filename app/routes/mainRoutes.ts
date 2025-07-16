import express from "express";
import todoController from "../controllers/todoController";

const router = express.Router();

router.get("/todos", todoController.get);
router.get("/todo/:id", todoController.getById);
router.post("/todo", todoController.post);
router.put("/todo/:id", todoController.put);
router.delete("/todo/:id", todoController.deleteTodo);

export default router;