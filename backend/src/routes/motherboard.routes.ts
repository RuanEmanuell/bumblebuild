import { Router, Request, Response } from "express";
import { MotherboardController } from "../controllers/motherboard.controller";
import { authenticateToken, isAdmin, verifyToken } from "../middlewares/authMiddleware";

const router = Router();
const motherboardController = new MotherboardController();

/**
 * @swagger
 * tags:
 *   - name: Motherboard
 *     description: Endpoints relacionados a placa-mãe
 */

/**
 * @swagger
 * /motherboards/create:
 *   post:
 *     tags: [Motherboard]
 *     summary: Cria uma nova placa-mãe
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
 *               ramType:
 *                 type: string
 *               slots:
 *                 type: integer
 *               maxRAM:
 *                 type: integer
 *               size:
 *                 type: string
 *             required:
 *               - socket
 *               - ramType
 *               - slots
 *               - maxRAM
 *               - size
 *     responses:
 *       201:
 *         description: Placa-mãe criada com sucesso
 */
router.post("/create", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await motherboardController.create(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /motherboards:
 *   get:
 *     tags: [Motherboard]
 *     summary: Lista todas as placas-mãe
 *     responses:
 *       200:
 *         description: Lista de placas-mãe
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    await motherboardController.list(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /motherboards/{id}:
 *   get:
 *     tags: [Motherboard]
 *     summary: Busca placa-mãe pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da placa-mãe
 *     responses:
 *       200:
 *         description: Placa-mãe encontrada
 *       404:
 *         description: Placa-mãe não encontrada
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    await motherboardController.search(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /motherboards/{id}:
 *   put:
 *     tags: [Motherboard]
 *     summary: Atualiza placa-mãe pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da placa-mãe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               socket:
 *                 type: string
 *               ramType:
 *                 type: string
 *               slots:
 *                 type: integer
 *               maxRAM:
 *                 type: integer
 *               size:
 *                 type: string
 *     responses:
 *       200:
 *         description: Placa-mãe atualizada com sucesso
 */
router.put("/:id", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await motherboardController.update(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /motherboards/{id}:
 *   delete:
 *     tags: [Motherboard]
 *     summary: Deleta placa-mãe pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da placa-mãe
 *     responses:
 *       204:
 *         description: Placa-mãe deletada com sucesso
 */
router.delete("/:id", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await motherboardController.delete(req, res);
  } catch (error) {
    console.error(error);
  }
});

export default router;
