import { Request, Response } from 'express';
import { BuildService } from '../services/build.service';

const buildService = new BuildService();

export class BuildController {
  async createBuild(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user!.id; 
      const { name, partIds } = req.body;

      const newBuild = await buildService.createBuild({ userId, name, partIds });

      return res.status(201).json({ message: 'Build created successfully!', build: newBuild });
    } catch (error: any) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }
  }

  async getUserBuilds(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user!.id;
      const builds = await buildService.getUserBuilds(userId);
      return res.status(200).json(builds);
    } catch (error: any) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }
  }
}
