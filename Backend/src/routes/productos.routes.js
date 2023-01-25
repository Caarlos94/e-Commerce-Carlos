import { Router } from "express";
import {
  getProductos,
  postProductos,
  updateProductos,
  deleteProdutos,
  getProductosId,
} from "../controllers/productos.controllers.js";

const router = Router();

router.get("/", getProductos);
router.get("/:id", getProductosId);
router.post("/", postProductos);
router.patch("/:id", updateProductos);
router.delete("/:id", deleteProdutos);

export default router;
