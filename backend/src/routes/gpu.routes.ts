import { Router, Request, Response } from "express";
import { GPUController } from "../controllers/gpu.controller";
import { autenticarToken, isAdmin, verifyToken } from "../middlewares/authMiddleware";

const router = Router();
const gpuController = new GPUController();

router.post("/create",autenticarToken, isAdmin, async (req: Request, res: Response) => {
  try {

    await gpuController.criar(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    await gpuController.listar(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    await gpuController.buscar(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.put("/:id",autenticarToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await gpuController.atualizar(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:id",autenticarToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await gpuController.deletar(req, res);
  } catch (error) {
    console.error(error);
  }
});
 
export default router;
