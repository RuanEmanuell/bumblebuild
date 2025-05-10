import { Router, Request, Response } from "express";
import { SSDController } from "../controllers/ssd.controller";
import { authenticateToken, isAdmin } from "../middlewares/authMiddleware";

const router = Router();
const ssdController = new SSDController();

router.post("/create", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {

    await ssdController.create(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    await ssdController.list(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    await ssdController.search(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.put("/:id", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await ssdController.update(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:id", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await ssdController.delete(req, res);
  } catch (error) {
    console.error(error);
  }
});
 
export default router;
