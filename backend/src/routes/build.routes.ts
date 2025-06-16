import { Router } from 'express';
import { suggestConfigurationWithBudget } from '../services/suggest.service';
import { Part, PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

router.post('/', async (req : any, res : any) => {
  try {
    const { budget } = req.body;

    if (typeof budget !== 'number') {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    const parts : any= await prisma.part.findMany({
      include: {
        cpu: true,
        gpu: true,
        ram: true,
        psu: true,
        motherboard: true,
        case: true,
        cooler: true,
      },
    });

    const result = suggestConfigurationWithBudget(parts, budget);

    if (result.configuration.length === 0) {
      return res.status(400).json({
        message: result.message || 'No configuration possible',
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    console.error('Error suggesting configuration:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
