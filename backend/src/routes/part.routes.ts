import { Router, Request, Response } from "express";
import { PartController } from "../controllers/part.controller";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();
const partController = new PartController();

router.post("/create", async (req: Request, res: Response) => {
  try {

    await partController.create(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    await partController.list(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    await partController.searchById(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.get("/tipo/:tipo", async (req: Request, res: Response) => {
  try {
    await partController.listByType(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    await partController.update(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await partController.delete(req, res);
  } catch (error) {
    console.error(error);
  }
});

export default router;
