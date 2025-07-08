import { Router, Request, Response } from "express";
import { PSUController } from "../controllers/psu.controller";
import { authenticateToken, isAdmin } from "../middlewares/authMiddleware";

const router = Router();
const psuController = new PSUController();

/**
 * @swagger
 * tags:
 *   - name: PSU
 *     description: Endpoints relacionados a PSUs (Power Supply Units)
 */

/**
 * @swagger
 * /psu/create:
 *   post:
 *     tags: [PSU]
 *     summary: Cria uma nova PSU (Power Supply Unit)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - powerW
 *               - certification
 *               - modular
 *             properties:
 *               powerW:
 *                 type: integer
 *               certification:
 *                 type: string
 *               modular:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: PSU criada com sucesso
 */
router.post("/create", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await psuController.create(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /psu:
 *   get:
 *     tags: [PSU]
 *     summary: Lista todas as PSUs
 *     responses:
 *       200:
 *         description: Lista de PSUs
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    await psuController.list(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /psu/{id}:
 *   get:
 *     tags: [PSU]
 *     summary: Busca uma PSU pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da PSU
 *     responses:
 *       200:
 *         description: PSU encontrada
 *       404:
 *         description: PSU não encontrada
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    await psuController.search(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /psu/{id}:
 *   put:
 *     tags: [PSU]
 *     summary: Atualiza uma PSU pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da PSU
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               powerW:
 *                 type: integer
 *               certification:
 *                 type: string
 *               modular:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: PSU atualizada com sucesso
 */
router.put("/:id", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await psuController.update(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /psu/{id}:
 *   delete:
 *     tags: [PSU]
 *     summary: Remove uma PSU pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da PSU
 *     responses:
 *       204:
 *         description: PSU removida com sucesso
 */
router.delete("/:id", authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    await psuController.delete(req, res);
  } catch (error) {
    console.error(error);
  }
});

export default router;
