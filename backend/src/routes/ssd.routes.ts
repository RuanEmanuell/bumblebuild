import { Router, Request, Response } from "express";
import { SSDController } from "../controllers/ssd.controller";
import { autenticarToken, isAdmin, verifyToken } from "../middlewares/authMiddleware";

const router = Router();
const ssdController = new SSDController();

router.post("/create",autenticarToken, isAdmin, async (req: Request, res: Response) => {
  try {

    await ssdController.criar(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    await ssdController.listar(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    await ssdController.buscar(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.put("/:id",autenticarToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await ssdController.atualizar(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:id",autenticarToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await ssdController.deletar(req, res);
  } catch (error) {
    console.error(error);
  }
});
 
export default router;
