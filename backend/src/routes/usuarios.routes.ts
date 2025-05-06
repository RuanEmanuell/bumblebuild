import { Router, Request, Response } from "express";
import { UsuarioController } from "../controllers/usuarios.controller";
import { autenticarToken } from "../middlewares/authMiddleware";

const router = Router();
const usuarioController = new UsuarioController();

router.post("/create", async (req: Request, res: Response) => {
  try {
    await usuarioController.criaUsuario(req, res);
  } catch (error) {
    console.error(error);
  }
});
router.post("/login", async (req: Request, res: Response) => {
  try {
    await usuarioController.loginUsuario(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.post("/logout", async (req: Request, res: Response) => {
  try {
    await usuarioController.logoutUsuario(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.post("/recuperar-senha", async(req: Request, res: Response) => {
  try {
    await usuarioController.solicitarRecuperacaoSenha(req,res);
  }catch(error) {
    console.error(error);
  }
});

router.post("/redefinir-senha", async(req: Request, res: Response) => {
  try {
    await usuarioController.redefinirSenha(req,res);
  }catch(error) {
    console.error(error);
  }
});

router.get("/logado", autenticarToken, async (req: Request, res: Response) => {
  try {
    await usuarioController.getUsuarioLogado(req, res);
  } catch (error) {
    console.error(error);
  }
});


export default router;
