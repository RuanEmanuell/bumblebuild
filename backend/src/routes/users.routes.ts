import { Router, Request, Response } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticateToken } from "../middlewares/authMiddleware";
import { upload } from "../config/upload";

const router = Router();
const userController = new UserController();

router.post("/create", async (req: Request, res: Response) => {
  try {
    await userController.create(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    await userController.login(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.post("/logout", async (req: Request, res: Response) => {
  try {
    await userController.logout(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.post("/recuperar-senha", async(req: Request, res: Response) => {
  try {
    await userController.requestPasswordReset(req,res);
  }catch(error) {
    console.error(error);
  }
});

router.post("/redefinir-senha", async(req: Request, res: Response) => {
  try {
    await userController.resetPassword(req,res);
  }catch(error) {
    console.error(error);
  }
});

router.get("/logado", authenticateToken, async (req: Request, res: Response) => {
  try {
    await userController.getLoggedUser(req, res);
  } catch (error) {
    console.error(error);
  }
});

router.put(
  "/edit/:id",
  authenticateToken,
  upload.single("profilePictureUrl"),
  async (req: Request, res: Response) => {
    try {
      await userController.update(req, res);
    } catch (error) {
      console.error(error);
    }
  }
);



export default router;
