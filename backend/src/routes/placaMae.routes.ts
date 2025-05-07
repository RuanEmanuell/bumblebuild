import { Router, Request, Response } from "express";
import { PlacaMaeController } from "../controllers/placaMae.controller";
import { autenticarToken, isAdmin, verifyToken } from "../middlewares/authMiddleware";

const router = Router();
const placaMaeController = new PlacaMaeController();

router.post("/create",autenticarToken, isAdmin, async (req: Request, res: Response) => {
  try {

    await placaMaeController.criar(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    await placaMaeController.listar(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    await placaMaeController.buscar(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.put("/:id",autenticarToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await placaMaeController.atualizar(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:id",autenticarToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await placaMaeController.deletar(req, res);
  } catch (error) {
    console.error(error);
  }
});
 
export default router;
