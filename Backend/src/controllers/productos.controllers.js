import { pool } from "../db.js";

export const getProductos = async (req, res) => {
  try {
    const [data] = await pool.query(
      "SELECT p.id, p.nombre, p.img, p.precio, p.color, p.talla, p.marca, p.stock, c.nombre AS categoria FROM productos p INNER JOIN categorias c ON p.categoria = c.id"
    );
    res.json(data);
  } catch (error) {
    return res.status(500).json({ message: "something goes wrong" });
  }
};

export const getProductosId = async (req, res) => {
  try {
    const [data] = await pool.query(
      "SELECT p.id, p.nombre, p.img, p.precio, p.color, p.talla, p.marca, p.stock, c.nombre AS categoria FROM productos p INNER JOIN categorias c ON p.categoria = c.id WHERE p.id = ?",
      [req.params.id]
    );
    if (data.length === 0)
      return res
        .status(404)
        .json("error: el producto con ese ID no fue encontrado");
    res.json(data[0]);
  } catch (error) {
    return res.status(500).json({ message: "something goes wrong" });
  }
};

export const postProductos = async (req, res) => {
  const { nombre, img, precio, color, talla, marca, stock, categoria } =
    req.body;
  try {
    const [data] = await pool.query(
      "INSERT INTO productos(nombre, img, precio, color, talla, marca, stock, categoria) VALUES(?,?,?,?,?,?,?,?)",
      [nombre, img, precio, color, talla, marca, stock, categoria]
    );
    const [producto] = await pool.query(
      "SELECT p.id, p.nombre, p.img, p.precio, p.color, p.talla, p.marca, p.stock, c.nombre AS categoria FROM productos p INNER JOIN categorias c ON p.categoria = c.id WHERE p.id = ?",
      [data.insertId]
    );
    res.json(producto[0]);
  } catch (error) {
    return res.status(500).json({ message: "something goes wrong" });
  }
};

export const updateProductos = async (req, res) => {
  const { nombre, img, precio, color, talla, marca, stock, categoria } =
    req.body;
  const { id } = req.params;
  try {
    const [data] = await pool.query(
      "UPDATE productos SET nombre = IFNULL(?, nombre), img = IFNULL(?, img), precio = IFNULL(?, precio), color = IFNULL(?, color), talla = IFNULL(?, talla), marca = IFNULL(?, marca), stock = IFNULL(?, stock), categoria = IFNULL(?, categoria) WHERE id = ?",
      [nombre, img, precio, color, talla, marca, stock, categoria, id]
    );
    if (data.affectedRows === 0)
      return res
        .status(404)
        .json("error: el producto con ese ID no fue encontrado");
    const [producto] = await pool.query(
      "SELECT p.id, p.nombre, p.img, p.precio, p.color, p.talla, p.marca, p.stock, c.nombre AS categoria FROM productos p INNER JOIN categorias c ON p.categoria = c.id WHERE p.id = ?",
      [id]
    );
    res.json(producto[0]);
  } catch (error) {
    return res.status(500).json({ message: "something goes wrong" });
  }
};

export const deleteProdutos = async (req, res) => {
  const { id } = req.params;
  try {
    const [data] = await pool.query("SELECT * FROM productos WHERE id = ?", id);
    if (data.length === 0)
      return res
        .status(404)
        .json("error: el producto con ese ID no fue encontrado");
    await pool.query("DELETE FROM productos WHERE id = ?", [id]);
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "something goes wrong" });
  }
};
