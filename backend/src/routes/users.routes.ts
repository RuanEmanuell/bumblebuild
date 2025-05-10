import { Router, Request, Response } from "express";
import { UsuarioController } from "../controllers/user.controller";
import { authenticateToken } from "../middlewares/authMiddleware";
import { upload } from "../config/upload";

const router = Router();
const usuarioController = new UsuarioController();

router.post("/create", async (req: Request, res: Response) => {
  try {
    await usuarioController.create(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    await usuarioController.login(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.post("/logout", async (req: Request, res: Response) => {
  try {
    await usuarioController.logout(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.post("/recuperar-senha", async(req: Request, res: Response) => {
  try {
    await usuarioController.requestPasswordReset(req,res);
  }catch(error) {
    console.error(error);
  }
});

router.post("/redefinir-senha", async(req: Request, res: Response) => {
  try {
    await usuarioController.resetPassword(req,res);
  }catch(error) {
    console.error(error);
  }
});

router.get("/logado", authenticateToken, async (req: Request, res: Response) => {
  try {
    await usuarioController.getLoggedUser(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.put(
  "/edit/:id",
  authenticateToken,
  upload.single("foto"),
  async (req: Request, res: Response) => {
    try {
      await usuarioController.update(req, res);
    } catch (error) {
      console.error(error);
    }
  }
);



export default router;
