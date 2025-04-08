import { Router, Request, Response } from "express";
import { PecaController } from "../controllers/peca.controller";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();
const pecaController = new PecaController();

router.post("/pecas/create", verifyToken, async (req: Request, res: Response) => {
  try {
    await pecaController.criarPeca(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/pecas", async (req: Request, res: Response) => {
  try {
    await pecaController.listarPecas(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/pecas/:id", async (req: Request, res: Response) => {
  try {
    await pecaController.buscarPorId(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/pecas/tipo/:tipo", async (req: Request, res: Response) => {
  try {
    await pecaController.listarPorTipo(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.put("/pecas/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    await pecaController.atualizarPeca(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/pecas/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    await pecaController.deletarPeca(req, res);
  } catch (error) {
    console.error(error);
  }
});

export default router;
