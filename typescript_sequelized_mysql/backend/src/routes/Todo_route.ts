import { Router } from "express";
import {
  createTodo,
  deleteToDo,
  getAllToDo,
  getTodoById,
  updateToDo,
} from "../controllers/Todo_controller";

const router = Router();

router.post("/", createTodo);
router.get("/", getAllToDo);
router.get("/:id", getTodoById);
router.put("/", updateToDo);
router.delete("/", deleteToDo);

export default router;
