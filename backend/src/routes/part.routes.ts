import { Router, Request, Response } from "express";
import { PartController } from "../controllers/part.controller";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();
const partController = new PartController();

/**
 * @swagger
 * tags:
 *   - name: Part
 *     description: Endpoints relacionados a peças (parts)
 */

/**
 * @swagger
 * /parts/create:
 *   post:
 *     tags: [Part]
 *     summary: Cria uma nova peça (part)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               brand:
 *                 type: string
 *               price:
 *                 type: number
 *               type:
 *                 type: string
 *                 description: Tipo da peça (CPU, GPU, RAM, etc)
 *               imageUrl:
 *                 type: string
 *                 nullable: true
 *               priceLink:
 *                 type: string
 *                 nullable: true
 *               rating:
 *                 type: number
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Peça criada com sucesso
 */
router.post("/create", async (req: Request, res: Response) => {
  try {
    await partController.create(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /parts:
 *   get:
 *     tags: [Part]
 *     summary: Lista todas as peças
 *     responses:
 *       200:
 *         description: Lista de peças
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    await partController.list(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /parts/{id}:
 *   get:
 *     tags: [Part]
 *     summary: Busca peça pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da peça
 *     responses:
 *       200:
 *         description: Peça encontrada
 *       404:
 *         description: Peça não encontrada
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    await partController.searchById(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /parts/tipo/{tipo}:
 *   get:
 *     tags: [Part]
 *     summary: Lista peças por tipo
 *     parameters:
 *       - in: path
 *         name: tipo
 *         schema:
 *           type: string
 *           enum: [CPU, GPU, RAM, SSD, PSU, CASE, MOTHERBOARD, COOLER]
 *         required: true
 *         description: Tipo da peça
 *     responses:
 *       200:
 *         description: Lista de peças do tipo solicitado
 */
router.get("/tipo/:tipo", async (req: Request, res: Response) => {
  try {
    await partController.listByType(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /parts/{id}:
 *   put:
 *     tags: [Part]
 *     summary: Atualiza peça pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da peça
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               brand:
 *                 type: string
 *               price:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [CPU, GPU, RAM, SSD, PSU, CASE, MOTHERBOARD, COOLER]
 *               imageUrl:
 *                 type: string
 *               priceLink:
 *                 type: string
 *               rating:
 *                 type: number
 *     responses:
 *       200:
 *         description: Peça atualizada com sucesso
 */
router.put("/:id", async (req: Request, res: Response) => {
  try {
    await partController.update(req, res);
  } catch (error) {
    console.error(error);
  }
});

/**
 * @swagger
 * /parts/{id}:
 *   delete:
 *     tags: [Part]
 *     summary: Deleta peça pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da peça
 *     responses:
 *       204:
 *         description: Peça deletada com sucesso
 */
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await partController.delete(req, res);
  } catch (error) {
    console.error(error);
  }
});

export default router;
