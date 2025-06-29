export const handleErrors = (err, req, res, next) => {
    console.error("🔥 Error:", err);

    if (err.code === 400 || err.status === 400) {
        return res.status(400).json({ message: err.message || "Solicitud incorrecta" });
    }
    if (err.code === 401 || err.status === 401) {
        return res.status(401).json({ message: err.message || "No autorizado" });
    }
    if (err.code === 403 || err.status === 403) {
        return res.status(403).json({ message: err.message || "Prohibido" });
    }
    if (err.code === 404 || err.status === 404) {
        return res.status(404).json({ message: err.message || "No encontrado" });
    }

    // Errores de validación de JWT
    if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Token inválido" });
    }
    if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expirado" });
    }

    // Error por defecto
    res.status(500).json({ message: "Error interno del servidor" });
};