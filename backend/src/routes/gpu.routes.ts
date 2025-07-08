import { Router, Request, Response } from "express";
import { GPUController } from "../controllers/gpu.controller";
import { authenticateToken, isAdmin, verifyToken } from "../middlewares/authMiddleware";

const router = Router();
const gpuController = new GPUController();

/**
 * @swagger
 * tags:
 *   - name: GPU
 *     description: Endpoints relacionados a GPU
 */

/**
 * @swagger
 * /gpus/create:
 *   post:
 *     tags: [GPU]
 *     summary: Cria uma nova GPU
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memoryGB:
 *                 type: integer
 *               memoryType:
 *                 type: string
 *               tdp:
 *                 type: integer
 *               lengthMM:
 *                 type: number
 *                 format: float
 *               gpuClock:
 *                 type: number
 *                 format: float
 *               memoryBus:
 *                 type: integer
 *             required:
 *               - memoryGB
 *               - memoryType
 *               - tdp
 *               - lengthMM
 *               - gpuClock
 *               - memoryBus
 *     responses:
 *       201:
 *         description: GPU criada com sucesso
 */
router.post("/create", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await gpuController.create(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /gpus:
 *   get:
 *     tags: [GPU]
 *     summary: Lista todas as GPUs
 *     responses:
 *       200:
 *         description: Lista de GPUs
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    await gpuController.list(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /gpus/{id}:
 *   get:
 *     tags: [GPU]
 *     summary: Busca GPU pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da GPU
 *     responses:
 *       200:
 *         description: GPU encontrada
 *       404:
 *         description: GPU não encontrada
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    await gpuController.search(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /gpus/{id}:
 *   put:
 *     tags: [GPU]
 *     summary: Atualiza GPU pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da GPU
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memoryGB:
 *                 type: integer
 *               memoryType:
 *                 type: string
 *               tdp:
 *                 type: integer
 *               lengthMM:
 *                 type: number
 *                 format: float
 *               gpuClock:
 *                 type: number
 *                 format: float
 *               memoryBus:
 *                 type: integer
 *     responses:
 *       200:
 *         description: GPU atualizada com sucesso
 */
router.put("/:id", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await gpuController.update(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /gpus/{id}:
 *   delete:
 *     tags: [GPU]
 *     summary: Deleta GPU pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da GPU
 *     responses:
 *       204:
 *         description: GPU deletada com sucesso
 */
router.delete("/:id", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await gpuController.delete(req, res);
  } catch (error) {
    console.error(error);
  }
});

export default router;
