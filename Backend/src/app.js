import express from "express"
import rutaProductos from "../src/routes/productos.routes.js";
import rutaCategorias from "../src/routes/categorias.routes.js";

const app = express()

// Middlewares
app.use(express.json())

// Rutas
app.use("/productos", rutaProductos)
app.use("/categorias", rutaCategorias)

// Middleware que maneja el NOT FOUND
app.use((req, res, next) => {
    res.status(404).json({message: "endpoint not found"})
})

export default app