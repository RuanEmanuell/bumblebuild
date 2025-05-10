// import { Request, Response } from "express";
// import { BuildService } from "../services/build.service"; 

// const buildService = new BuildService(); 

// export class BuildController { 

//   async createBuild(req: Request, res: Response): Promise<Response> { 
//     try {
//       const newBuild = await buildService.createBuild(req.body); 
//       return res.status(201).json({ message: "Build created successfully!", build: newBuild }); 
//     } catch (error: any) {
//       console.error(error);
//       return res.status(400).json({ error: error.message });
//     }
//   }
// }

