import cron from "node-cron";
import { PecaRepository } from "../repositories/peca.repository";

const pecaRepository = new PecaRepository();

cron.schedule("0 3 * * *", async () => {
  console.log("Executando atualização de preços de peças...");
  await pecaRepository.atualizarPrecosAutomaticamente();
  console.log("Finalizada atualização de preços de peças...");
});
