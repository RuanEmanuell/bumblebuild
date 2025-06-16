import { Router } from 'express';
import { suggestConfigurationWithBudget } from '../services/suggest.service';
import { Part, PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

router.post('/suggest', async (req : any, res : any) => {
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
    console.error('Error suggesting configuration:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/builds', async (req: any, res: any) => {
  try {
    const userId = req.user!.id; 
    const { name, partIds } = req.body;

    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    if (!name || !Array.isArray(partIds) || partIds.length === 0) {
      return res.status(400).json({ message: 'Name and partIds are required' });
    }

    const build = await prisma.build.create({
      data: {
        userId,
        name,
        buildParts: {
          create: partIds.map((partId: number) => ({
            part: { connect: { id: partId } },
          })),
        },
      },
      include: {
        buildParts: {
          include: { part: true },
        },
      },
    });

    return res.status(201).json(build);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/builds', async (req: any, res: any) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const builds = await prisma.build.findMany({
      where: { userId },
      include: {
        buildParts: {
          include: { part: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json(builds);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/builds/:id', async (req: any, res: any) => {
  try {
    const userId = req.user?.id;
    const buildId = Number(req.params.id);
    const { name, partIds } = req.body;

    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    if (!name && !partIds) return res.status(400).json({ message: 'Nothing to update' });

    const existingBuild = await prisma.build.findUnique({
      where: { id: buildId },
    });
    if (!existingBuild || existingBuild.userId !== userId) {
      return res.status(404).json({ message: 'Build not found or unauthorized' });
    }

    const dataToUpdate: any = {};
    if (name) dataToUpdate.name = name;

    if (partIds && Array.isArray(partIds)) {
      await prisma.buildPart.deleteMany({ where: { buildId } });

      dataToUpdate.buildParts = {
        create: partIds.map((partId: number) => ({
          part: { connect: { id: partId } },
        })),
      };
    }

    const updatedBuild = await prisma.build.update({
      where: { id: buildId },
      data: dataToUpdate,
      include: {
        buildParts: {
          include: { part: true },
        },
      },
    });

    return res.status(200).json(updatedBuild);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/builds/:id', async (req: any, res: any) => {
  try {
    const userId = req.user?.id;
    const buildId = Number(req.params.id);

    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const existingBuild = await prisma.build.findUnique({
      where: { id: buildId },
    });
    if (!existingBuild || existingBuild.userId !== userId) {
      return res.status(404).json({ message: 'Build not found or unauthorized' });
    }

    await prisma.buildPart.deleteMany({ where: { buildId } });
    await prisma.build.delete({ where: { id: buildId } });

    return res.status(200).json({ message: 'Build deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
