import { Router } from "express";
import { login } from "../src/controllers/login.controller.js";
import verificarCredenciales from "../middlewares/verificar_credenciales.js";

const router = Router();

router.post("/", verificarCredenciales, login);

export default router;
