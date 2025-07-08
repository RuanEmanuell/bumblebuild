import { Router, Request, Response } from "express";
import { RAMController } from "../controllers/ram.controller";
import { authenticateToken, isAdmin } from "../middlewares/authMiddleware";

const router = Router();
const ramController = new RAMController();

/**
 * @swagger
 * tags:
 *   - name: RAM
 *     description: Endpoints relacionados a módulos de RAM
 */

/**
 * @swagger
 * /ram/create:
 *   post:
 *     tags: [RAM]
 *     summary: Cria um novo módulo de RAM
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - capacityGB
 *               - type
 *               - frequency
 *             properties:
 *               capacityGB:
 *                 type: integer
 *               type:
 *                 type: string
 *               frequency:
 *                 type: integer
 *     responses:
 *       201:
 *         description: RAM criada com sucesso
 */
router.post("/create", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await ramController.create(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /ram:
 *   get:
 *     tags: [RAM]
 *     summary: Lista todos os módulos de RAM
 *     responses:
 *       200:
 *         description: Lista de RAMs
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    await ramController.list(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /ram/{id}:
 *   get:
 *     tags: [RAM]
 *     summary: Busca um módulo de RAM pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da RAM
 *     responses:
 *       200:
 *         description: RAM encontrada
 *       404:
 *         description: RAM não encontrada
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    await ramController.search(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /ram/{id}:
 *   put:
 *     tags: [RAM]
 *     summary: Atualiza um módulo de RAM pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da RAM
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               capacityGB:
 *                 type: integer
 *               type:
 *                 type: string
 *               frequency:
 *                 type: integer
 *     responses:
 *       200:
 *         description: RAM atualizada com sucesso
 */
router.put("/:id", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await ramController.update(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /ram/{id}:
 *   delete:
 *     tags: [RAM]
 *     summary: Remove um módulo de RAM pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da RAM
 *     responses:
 *       204:
 *         description: RAM removida com sucesso
 */
router.delete("/:id", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await ramController.delete(req, res);
  } catch (error) {
    console.error(error);
  }
});

export default router;
