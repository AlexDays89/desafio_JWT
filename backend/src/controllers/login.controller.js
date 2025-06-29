import jwt from "jsonwebtoken";
import pool from "../../database/config.js";
import bcrypt from "bcryptjs";

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log("Intentando login:", email, password);

        const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
        console.log("Resultado SQL:", result.rows);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }
        const usuario = result.rows[0];
        const passwordValida = await bcrypt.compare(password, usuario.password);
        console.log("Password válida:", passwordValida);

        if (!passwordValida) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }
        const SECRET_KEY = process.env.JWT_SECRET || "supersecret";
        const token = jwt.sign({ email: usuario.email }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        next(error);
    }
}