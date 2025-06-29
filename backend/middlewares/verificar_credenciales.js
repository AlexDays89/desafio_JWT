
const verificarCredenciales = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next({ code: 400, message: "Faltan credenciales" });
    }
    next();
}

export default verificarCredenciales;