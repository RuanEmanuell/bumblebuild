import { Router, Request, Response } from "express";
import { PSUController } from "../controllers/psu.controller";
import { authenticateToken, isAdmin } from "../middlewares/authMiddleware";

const router = Router();
const psuController = new PSUController();

router.post("/create",authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {

    await psuController.create(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    await psuController.list(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    await psuController.search(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.put("/:id", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await psuController.update(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:id", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await psuController.delete(req, res);
  } catch (error) {
    console.error(error);
  }
});
 
export default router;
