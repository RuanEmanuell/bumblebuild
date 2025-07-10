import cron from "node-cron";
import { PartRepository } from "../repositories/part.repository";

const partRepository = new PartRepository();

cron.schedule("30 23 * * *", async () => {
  console.log("Executando atualização de preços de peças...");
  await partRepository.autoUpdatePrices();
  console.log("Finalizada atualização de preços de peças...");
});
