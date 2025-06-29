import pool from "../../database/config.js";
import bcrypt from "bcryptjs";

export const obtenerusuarios = async (req, res, next) => {
    try {
        const { email } = req;
        const result = await pool.query("SELECT id, email, rol, lenguage FROM usuarios WHERE email = $1", [email]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json([result.rows[0]]);
    } catch (error) {
        next(error);
    }
}

export const registrarusuario = async (req, res, next) => {
    try {
        const { email, password, rol, lenguage } = req.body;
        // Verifica si el usuario ya existe
        const existe = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
        if (existe.rows.length > 0) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }
        // Hashea la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        const usuario = await pool.query(
            "INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING id, email, rol, lenguage",
            [email, hashedPassword, rol, lenguage]
        );
        res.status(201).json(usuario.rows[0]);
    } catch (error) {
        next(error);
    }
}