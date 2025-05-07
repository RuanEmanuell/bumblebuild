import { Router, Request, Response } from "express";
import { PecaController } from "../controllers/peca.controller";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();
const pecaController = new PecaController();

router.post("/create", async (req: Request, res: Response) => {
  try {

    await pecaController.criarPeca(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    await pecaController.listarPecas(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    await pecaController.buscarPorId(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/tipo/:tipo", async (req: Request, res: Response) => {
  try {
    await pecaController.listarPorTipo(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    await pecaController.atualizarPeca(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await pecaController.deletarPeca(req, res);
  } catch (error) {
    console.error(error);
  }
});

export default router;
