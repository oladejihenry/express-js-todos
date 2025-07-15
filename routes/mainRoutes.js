const express = require("express");
const mainController = require("../controllers/mainController");

const router = express.Router();

router.get("/todos", mainController.get);
router.get("/todos/:id", mainController.getById);
router.post("/todos", mainController.post);
router.put("/todos/:id", mainController.put);
router.delete("/todos/:id", mainController.delete);

module.exports = router;