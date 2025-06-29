import { Router } from "express";
import { obtenerusuarios, registrarusuario } from "../src/controllers/usuario.controller.js";
import validarToken from "../middlewares/validar_token.js";

const router = Router();

router.get("/", validarToken, obtenerusuarios);
router.post("/", registrarusuario);

export default router;
