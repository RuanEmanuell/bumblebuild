import { Router, Request, Response } from 'express';
import { suggestConfigurationWithBudget } from '../services/suggest.service';
import { Part } from '../models/part.model';

const router = Router();

router.post('/build', (req: any, res: any) => {
  try {
    const { parts, budget } = req.body;

    if (!Array.isArray(parts) || typeof budget !== 'number') {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    const result = suggestConfigurationWithBudget(parts as Part[], budget);

    if (result.configuration.length === 0) {
      return res.status(400).json({ message: result.message || 'No configuration possible' });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error suggesting configuration:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
