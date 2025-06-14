import { Router, Request, Response } from "express";
import { CPUController } from "../controllers/cpu.controller";
import { authenticateToken, isAdmin, verifyToken } from "../middlewares/authMiddleware";

const router = Router();
const cpuController = new CPUController();

router.post("/create", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {

    await cpuController.create(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    await cpuController.list(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    await cpuController.search(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.put("/:id", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await cpuController.update(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:id", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await cpuController.delete(req, res);
  } catch (error) {
    console.error(error);
  }
});
 
export default router;
