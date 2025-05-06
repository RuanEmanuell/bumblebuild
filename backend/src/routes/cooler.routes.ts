import { Router, Request, Response } from "express";
import { CoolerController } from "../controllers/cooler.controller";
import { autenticarToken, isAdmin, verifyToken } from "../middlewares/authMiddleware";

const router = Router();
const coolerController = new CoolerController();

router.post("/create",autenticarToken, isAdmin, async (req: Request, res: Response) => {
  try {

    await coolerController.criar(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    await coolerController.listar(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    await coolerController.buscar(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.put("/:id",autenticarToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await coolerController.atualizar(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:id",autenticarToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await coolerController.deletar(req, res);
  } catch (error) {
    console.error(error);
  }
});
 
export default router;
