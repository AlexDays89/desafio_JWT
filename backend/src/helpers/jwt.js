import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "supersecret";

export function firmarToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}

export function verificarToken(token) {
    return jwt.verify(token, SECRET_KEY);
}

export function decodificarToken(token) {
    return jwt.decode(token);
}
