import express from "express";
import mainController from "../controllers/mainController";

const router = express.Router();

router.get("/todos", mainController.get);
router.get("/todo/:id", mainController.getById);
router.post("/todo", mainController.post);
router.put("/todo/:id", mainController.put);
router.delete("/todo/:id", mainController.deleteTodo);

export default router;