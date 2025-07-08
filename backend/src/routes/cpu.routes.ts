import { Router, Request, Response } from "express";
import { CPUController } from "../controllers/cpu.controller";
import { authenticateToken, isAdmin, verifyToken } from "../middlewares/authMiddleware";

const router = Router();
const cpuController = new CPUController();

/**
 * @swagger
 * tags:
 *   - name: CPU
 *     description: Endpoints relacionados a CPU
 */

/**
 * @swagger
 * /cpus/create:
 *   post:
 *     tags: [CPU]
 *     summary: Cria uma nova CPU
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               socket:
 *                 type: string
 *               cores:
 *                 type: integer
 *               threads:
 *                 type: integer
 *               frequency:
 *                 type: number
 *                 format: float
 *               tdp:
 *                 type: integer
 *               integratedGraphics:
 *                 type: boolean
 *             required:
 *               - socket
 *               - cores
 *               - threads
 *               - frequency
 *               - tdp
 *               - integratedGraphics
 *     responses:
 *       201:
 *         description: CPU criada com sucesso
 */
router.post("/create", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await cpuController.create(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /cpus:
 *   get:
 *     tags: [CPU]
 *     summary: Lista todas as CPUs
 *     responses:
 *       200:
 *         description: Lista de CPUs
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    await cpuController.list(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /cpus/{id}:
 *   get:
 *     tags: [CPU]
 *     summary: Busca CPU pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da CPU
 *     responses:
 *       200:
 *         description: CPU encontrada
 *       404:
 *         description: CPU não encontrada
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    await cpuController.search(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /cpus/{id}:
 *   put:
 *     tags: [CPU]
 *     summary: Atualiza CPU pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da CPU
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               socket:
 *                 type: string
 *               cores:
 *                 type: integer
 *               threads:
 *                 type: integer
 *               frequency:
 *                 type: number
 *                 format: float
 *               tdp:
 *                 type: integer
 *               integratedGraphics:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: CPU atualizada com sucesso
 */
router.put("/:id", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await cpuController.update(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /cpus/{id}:
 *   delete:
 *     tags: [CPU]
 *     summary: Deleta CPU pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da CPU
 *     responses:
 *       204:
 *         description: CPU deletada com sucesso
 */
router.delete("/:id", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await cpuController.delete(req, res);
  } catch (error) {
    console.error(error);
  }
});

export default router;
