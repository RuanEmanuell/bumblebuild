import { Router, Request, Response } from "express";
import { CPUController } from "../controllers/cpu.controller";
import { autenticarToken, isAdmin, verifyToken } from "../middlewares/authMiddleware";

const router = Router();
const cpuController = new CPUController();

router.post("/create",autenticarToken, isAdmin, async (req: Request, res: Response) => {
  try {

    await cpuController.criar(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    await cpuController.listar(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    await cpuController.buscar(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.put("/:id",autenticarToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await cpuController.atualizar(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:id",autenticarToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await cpuController.deletar(req, res);
  } catch (error) {
    console.error(error);
  }
});
 
export default router;
