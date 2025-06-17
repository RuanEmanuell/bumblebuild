import { Router, Request, Response } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticateToken } from "../middlewares/authMiddleware";
import { upload } from "../config/upload";

const router = Router();
const userController = new UserController();

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Cria um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
router.post("/create", async (req: Request, res: Response) => {
  await userController.create(req, res);
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Realiza o login do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 */
router.post("/login", async (req: Request, res: Response) => {
  await userController.login(req, res);
});

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Faz logout do usuário
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 */
router.post("/logout", async (req: Request, res: Response) => {
  await userController.logout(req, res);
});

/**
 * @swagger
 * /users/recuperar-senha:
 *   post:
 *     summary: Envia e-mail de recuperação de senha
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token de redefinição enviado por e-mail
 */
router.post("/recuperar-senha", async (req: Request, res: Response) => {
  await userController.requestPasswordReset(req, res);
});

/**
 * @swagger
 * /users/redefinir-senha:
 *   post:
 *     summary: Redefine a senha do usuário com token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 */
router.post("/redefinir-senha", async (req: Request, res: Response) => {
  await userController.resetPassword(req, res);
});

/**
 * @swagger
 * /users/logado:
 *   get:
 *     summary: Retorna dados do usuário logado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário logado
 */
router.get(
  "/logado",
  authenticateToken,
  async (req: Request, res: Response) => {
    await userController.getLoggedUser(req, res);
  }
);

/**
 * @swagger
 * /users/edit/{id}:
 *   put:
 *     summary: Atualiza dados do usuário (inclui imagem de perfil)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               profilePictureUrl:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 */
router.put(
  "/edit/:id",
  authenticateToken,
  upload.single("profilePictureUrl"),
  async (req: Request, res: Response) => {
    await userController.update(req, res);
  }
);

export default router;
