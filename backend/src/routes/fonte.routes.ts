import { Router, Request, Response } from "express";
import { FonteController } from "../controllers/fonte.controller";
import { autenticarToken, isAdmin, verifyToken } from "../middlewares/authMiddleware";

const router = Router();
const fonteController = new FonteController();

router.post("/create",autenticarToken, isAdmin, async (req: Request, res: Response) => {
  try {

    await fonteController.criar(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    await fonteController.listar(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    await fonteController.buscar(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.put("/:id",autenticarToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await fonteController.atualizar(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:id",autenticarToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await fonteController.deletar(req, res);
  } catch (error) {
    console.error(error);
  }
});
 
export default router;
