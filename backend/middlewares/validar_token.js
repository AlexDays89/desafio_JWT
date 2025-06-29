import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "supersecret";

const validarToken = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) throw { code: 401, message: "Token no proporcionado" };
        const token = authHeader.split(" ")[1];
        if (!token) throw { code: 401, message: "Token malformado" };
        const payload = jwt.verify(token, SECRET_KEY);
        req.email = payload.email;
        next();
    } catch (error) {
        next({ code: 401, message: "Token inválido o expirado" });
    }
};

export default validarToken;
