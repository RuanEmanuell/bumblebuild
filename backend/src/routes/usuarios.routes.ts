import { Router, Request, Response } from "express";
import { UsuarioController } from "../controllers/usuarios.controller";

const router = Router();
const usuarioController = new UsuarioController();

router.post("/user/create", async (req: Request, res: Response) => {
  try {
    await usuarioController.criaUsuario(req, res);
  } catch (error) {
    console.error(error);
  }
});
router.post("/user/login", async (req: Request, res: Response) => {
  try {
    await usuarioController.loginUsuario(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.post("/users/logout", async (req: Request, res: Response) => {
  try {
    await usuarioController.logoutUsuario(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.post("/user/recuperar-senha", async(req: Request, res: Response) => {
  try {
    await usuarioController.solicitarRecuperacaoSenha(req,res);
  }catch(error) {
    console.error(error);
  }
});

router.post("/user/redefinir-senha", async(req: Request, res: Response) => {
  try {
    await usuarioController.redefinirSenha(req,res);
  }catch(error) {
    console.error(error);
  }
});


export default router;
