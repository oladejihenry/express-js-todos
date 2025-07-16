import express from "express";
import postController from "../controllers/PostControler";
import { register, login } from "../controllers/AuthController";
import { authMiddleware } from "../middleware/AuthMiddleware";

const router = express.Router();

//Auth Routes
router.post("/register", register);
router.post("/login", login);


//Post Routes
router.get("/posts", authMiddleware, postController.get);
// router.get("/post/:id", postController.getById);
router.post("/post", authMiddleware, postController.post);
// router.put("/post/:id", postController.put);
// router.delete("/post/:id", postController.deletePost);

export default router;