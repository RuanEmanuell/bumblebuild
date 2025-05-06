import { Router, Request, Response } from "express";
import { RAMController } from "../controllers/ram.controller";
import { autenticarToken, isAdmin, verifyToken } from "../middlewares/authMiddleware";

const router = Router();
const ramController = new RAMController();

router.post("/create",autenticarToken, isAdmin, async (req: Request, res: Response) => {
  try {

    await ramController.criar(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    await ramController.listar(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    await ramController.buscar(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.put("/:id",autenticarToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await ramController.atualizar(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:id",autenticarToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await ramController.deletar(req, res);
  } catch (error) {
    console.error(error);
  }
});
 
export default router;
