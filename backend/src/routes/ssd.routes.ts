import { Router, Request, Response } from "express";
import { SSDController } from "../controllers/ssd.controller";
import { authenticateToken, isAdmin } from "../middlewares/authMiddleware";

const router = Router();
const ssdController = new SSDController();

/**
 * @swagger
 * tags:
 *   - name: SSD
 *     description: Endpoints relacionados a SSDs
 */

/**
 * @swagger
 * /ssd/create:
 *   post:
 *     tags: [SSD]
 *     summary: Cria um novo SSD
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
 *               - readMBs
 *               - writeMBs
 *             properties:
 *               capacityGB:
 *                 type: integer
 *               type:
 *                 type: string
 *               readMBs:
 *                 type: integer
 *               writeMBs:
 *                 type: integer
 *     responses:
 *       201:
 *         description: SSD criado com sucesso
 */
router.post("/create", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await ssdController.create(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /ssd:
 *   get:
 *     tags: [SSD]
 *     summary: Lista todos os SSDs
 *     responses:
 *       200:
 *         description: Lista de SSDs
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    await ssdController.list(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /ssd/{id}:
 *   get:
 *     tags: [SSD]
 *     summary: Busca um SSD pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do SSD
 *     responses:
 *       200:
 *         description: SSD encontrado
 *       404:
 *         description: SSD não encontrado
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    await ssdController.search(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /ssd/{id}:
 *   put:
 *     tags: [SSD]
 *     summary: Atualiza um SSD pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do SSD
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
 *               readMBs:
 *                 type: integer
 *               writeMBs:
 *                 type: integer
 *     responses:
 *       200:
 *         description: SSD atualizado com sucesso
 */
router.put("/:id", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await ssdController.update(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /ssd/{id}:
 *   delete:
 *     tags: [SSD]
 *     summary: Remove um SSD pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do SSD
 *     responses:
 *       204:
 *         description: SSD removido com sucesso
 */
router.delete("/:id", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await ssdController.delete(req, res);
  } catch (error) {
    console.error(error);
  }
});

export default router;
