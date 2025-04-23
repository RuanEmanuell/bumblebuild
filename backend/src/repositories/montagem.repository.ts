import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export class MontagemRepository {
    async criarMontagem(dados: Prisma.MontagemCreateInput) {
        try {
            return await prisma.montagem.create({
                data: dados,
                include: {
                    cpu: true,
                    gpu: true,
                    ram: true,
                    ssd: true,
                    fonte: true,
                    gabinete: true,
                    placaMae: true,
                    usuario: true,
                },
            });
        } catch (error) {
            console.error("Erro ao criar montagem:", error);
            throw error;
        }
    }


}
