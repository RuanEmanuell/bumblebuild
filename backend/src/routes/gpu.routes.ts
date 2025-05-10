import { Router, Request, Response } from "express";
import { GPUController } from "../controllers/gpu.controller";
import { authenticateToken, isAdmin, verifyToken } from "../middlewares/authMiddleware";

const router = Router();
const gpuController = new GPUController();

router.post("/create", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {

    await gpuController.create(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    await gpuController.list(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    await gpuController.search(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.put("/:id", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await gpuController.update(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:id", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await gpuController.delete(req, res);
  } catch (error) {
    console.error(error);
  }
});
 
export default router;
