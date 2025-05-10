import { Router, Request, Response } from "express";
import { MotherboardController } from "../controllers/motherboard.controller";
import { authenticateToken, isAdmin, verifyToken } from "../middlewares/authMiddleware";

const router = Router();
const motherboardController = new MotherboardController();

router.post("/create", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {

    await motherboardController.create(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    await motherboardController.list(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    await motherboardController.search(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.put("/:id", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await motherboardController.update(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:id", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await motherboardController.delete(req, res);
  } catch (error) {
    console.error(error);
  }
});
 
export default router;
