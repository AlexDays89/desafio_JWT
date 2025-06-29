import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import usuariosRoutes from "./routes/usuarios.route.js";
import loginRoutes from "./routes/login.route.js";
import logRequests from "./middlewares/log_requests.js";
import validarToken from "./middlewares/validar_token.js";
import { handleErrors } from './middlewares/handleErrors.js';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(logRequests);
app.use('/usuarios', usuariosRoutes);
app.use('/login', loginRoutes);
app.use(handleErrors);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});