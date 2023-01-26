import express from "express"
import rutaProductos from "../src/routes/productos.routes.js";
import rutaCategorias from "../src/routes/categorias.routes.js";

const app = express()

// Middlewares
app.use(express.json())

// Rutas
app.use("/productos", rutaProductos)
app.use("/categorias", rutaCategorias)

export default app