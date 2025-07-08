import { Router, Request, Response } from "express";
import { CoolerController } from "../controllers/cooler.controller";
import { authenticateToken, isAdmin, verifyToken } from "../middlewares/authMiddleware";

const router = Router();
const coolerController = new CoolerController();

/**
 * @swagger
 * tags:
 *   - name: Cooler
 *     description: Endpoints relacionados a Cooler
 */

/**
 * @swagger
 * /coolers/create:
 *   post:
 *     tags: [Cooler]
 *     summary: Cria um novo cooler
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               socketSupport:
 *                 type: string
 *               noiseLevel:
 *                 type: integer
 *               maxTdp:
 *                 type: integer
 *             required:
 *               - type
 *               - socketSupport
 *               - noiseLevel
 *               - maxTdp
 *     responses:
 *       201:
 *         description: Cooler criado com sucesso
 */
router.post("/create", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await coolerController.create(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /coolers:
 *   get:
 *     tags: [Cooler]
 *     summary: Lista todos os coolers
 *     responses:
 *       200:
 *         description: Lista de coolers
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    await coolerController.list(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /coolers/{id}:
 *   get:
 *     tags: [Cooler]
 *     summary: Busca cooler pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do cooler
 *     responses:
 *       200:
 *         description: Cooler encontrado
 *       404:
 *         description: Cooler não encontrado
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    await coolerController.search(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /coolers/{id}:
 *   put:
 *     tags: [Cooler]
 *     summary: Atualiza cooler pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do cooler
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               socketSupport:
 *                 type: string
 *               noiseLevel:
 *                 type: integer
 *               maxTdp:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cooler atualizado com sucesso
 */
router.put("/:id", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await coolerController.update(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /coolers/{id}:
 *   delete:
 *     tags: [Cooler]
 *     summary: Deleta cooler pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do cooler
 *     responses:
 *       204:
 *         description: Cooler deletado com sucesso
 */
router.delete("/:id", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await coolerController.delete(req, res);
  } catch (error) {
    console.error(error);
  }
});

export default router;
