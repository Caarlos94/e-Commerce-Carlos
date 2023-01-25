import { Router } from "express";
import {
  getCategorias,
  postCategorias,
  updateCategorias,
  deleteCategorias,
} from "../controllers/categorias.controllers.js";

const router = Router();

router.get("/", getCategorias);
router.post("/", postCategorias);
router.put("/:id", updateCategorias);
router.delete("/:id", deleteCategorias);

export default router;
