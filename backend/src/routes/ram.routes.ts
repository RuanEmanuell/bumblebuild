import { Router, Request, Response } from "express";
import { RAMController } from "../controllers/ram.controller";
import { authenticateToken, isAdmin } from "../middlewares/authMiddleware";

const router = Router();
const ramController = new RAMController();

router.post("/create", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {

    await ramController.create(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    await ramController.list(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    await ramController.search(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.put("/:id", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await ramController.update(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:id", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await ramController.delete(req, res);
  } catch (error) {
    console.error(error);
  }
});
 
export default router;
