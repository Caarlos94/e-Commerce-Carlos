import { pool } from "../db.js";

export const getCategorias = async (req, res) => {
  const [data] = await pool.query("SELECT * FROM categorias");
  res.json(data);
};

export const postCategorias = async (req, res) => {
  const { nombre } = req.body;
  const [data] = await pool.query(
    "INSERT INTO categorias (nombre) VALUES (?)",
    [nombre]
  );
  res.json({
    id: data.insertId,
    nombre,
  });
};

export const updateCategorias = async (req, res) => {
  const { nombre } = req.body;
  const { id } = req.params;
  const [data] = await pool.query(
    "UPDATE categorias SET nombre = IFNULL(?, nombre) WHERE id = ?",
    [nombre, id]
  );
  if (data.affectedRows === 0)
    return res
      .status(404)
      .json("error: la categoria con ese ID no fue encontrada");
  const [categoria] = await pool.query(
    "SELECT * FROM categorias WHERE id = ?",
    [id]
  );
  res.json(categoria);
};

export const deleteCategorias = async (req, res) => {
  const { id } = req.params;
  const [data] = await pool.query("SELECT * FROM categorias WHERE id = ?", [
    id,
  ]);
  if (data.length === 0)
    return res
      .status(404)
      .json("error: la categoria con ese ID no fue encontrada");
  await pool.query("DELETE FROM productos WHERE id = ?", [id]);
  res.sendStatus(204);
};
