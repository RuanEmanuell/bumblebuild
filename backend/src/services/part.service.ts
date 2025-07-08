import { PartRepository } from "../repositories/part.repository";
import { CPURepository } from "../repositories/cpu.repository";
import { GPURepository } from "../repositories/gpu.repository";
import { RAMRepository } from "../repositories/ram.repository";
import { SSDRepository } from "../repositories/ssd.repository";
import { PSURepository } from "../repositories/psu.repository";
import { MotherboardRepository } from "../repositories/motherboard.repository";
import { CaseRepository } from "../repositories/case.repository";
import { CoolerRepository } from "../repositories/cooler.repository";

import { PartRatingService } from "./partRating.service";

const partRepository = new PartRepository();
const cpuRepository = new CPURepository();
const gpuRepository = new GPURepository();
const ramRepository = new RAMRepository();
const ssdRepository = new SSDRepository();
const psuRepository = new PSURepository();
const motherboardRepository = new MotherboardRepository();
const caseRepository = new CaseRepository();
const coolerRepository = new CoolerRepository();

export class PartService {
  async createPart(data: any) {
    return await partRepository.create(data);
  }

  async listParts() {
    const parts = await partRepository.list();
    const partsWithRating = await Promise.all(
      parts.map(async (part) => {
        let rating = 0;
        switch (part.type) {
          case "CPU":
            const cpu = await cpuRepository.searchById(part.id);
            if (cpu) rating = PartRatingService.calculateCPURating(cpu);
            break;
          case "GPU":
            const gpu = await gpuRepository.searchById(part.id);
            if (gpu) rating = PartRatingService.calculateGPURating(gpu);
            break;
          case "RAM":
            const ram = await ramRepository.searchById(part.id);
            if (ram) rating = PartRatingService.calculateRAMRating(ram);
            break;
          case "SSD":
            const ssd = await ssdRepository.searchById(part.id);
            if (ssd) rating = PartRatingService.calculateSSDRating(ssd);
            break;
          case "PSU":
            const psu = await psuRepository.searchById(part.id);
            if (psu) rating = PartRatingService.calculatePSURating(psu);
            break;
          case "MOTHERBOARD":
            const mobo = await motherboardRepository.searchById(part.id);
            if (mobo) rating = PartRatingService.calculateMotherboardRating(mobo);
            break;
          case "CASE":
            const pcCase = await caseRepository.searchById(part.id);
            if (pcCase) rating = PartRatingService.calculateCaseRating(pcCase);
            break;
          case "COOLER":
            const cooler = await coolerRepository.searchById(part.id);
            if (cooler) rating = PartRatingService.calculateCoolerRating(cooler);
            break;
          default:
            rating = part.rating || 0;
        }
        return { ...part, rating };
      })
    );
    return partsWithRating;
  }

  async searchById(id: number) {
    const part = await partRepository.searchById(id);
    if (!part) throw new Error("Peça não encontrada");

    let rating = 0;
    switch (part.type) {
      case "CPU":
        const cpu = await cpuRepository.searchById(id);
        if (cpu) rating = PartRatingService.calculateCPURating(cpu);
        break;
      case "GPU":
        const gpu = await gpuRepository.searchById(id);
        if (gpu) rating = PartRatingService.calculateGPURating(gpu);
        break;
      case "RAM":
        const ram = await ramRepository.searchById(id);
        if (ram) rating = PartRatingService.calculateRAMRating(ram);
        break;
      case "SSD":
        const ssd = await ssdRepository.searchById(id);
        if (ssd) rating = PartRatingService.calculateSSDRating(ssd);
        break;
      case "PSU":
        const psu = await psuRepository.searchById(id);
        if (psu) rating = PartRatingService.calculatePSURating(psu);
        break;
      case "MOTHERBOARD":
        const mobo = await motherboardRepository.searchById(id);
        if (mobo) rating = PartRatingService.calculateMotherboardRating(mobo);
        break;
      case "CASE":
        const pcCase = await caseRepository.searchById(id);
        if (pcCase) rating = PartRatingService.calculateCaseRating(pcCase);
        break;
      case "COOLER":
        const cooler = await coolerRepository.searchById(id);
        if (cooler) rating = PartRatingService.calculateCoolerRating(cooler);
        break;
      default:
        rating = part.rating || 0;
    }

    return { ...part, rating };
  }

  async listByType(tipo: string) {
    const parts = await partRepository.listByType(tipo.toUpperCase());
    const partsWithRating = await Promise.all(
      parts.map(async (part) => {
        let rating = 0;
        switch (part.type) {
          case "CPU":
            const cpu = await cpuRepository.searchById(part.id);
            if (cpu) rating = PartRatingService.calculateCPURating(cpu);
            break;
          case "GPU":
            const gpu = await gpuRepository.searchById(part.id);
            if (gpu) rating = PartRatingService.calculateGPURating(gpu);
            break;
          case "RAM":
            const ram = await ramRepository.searchById(part.id);
            if (ram) rating = PartRatingService.calculateRAMRating(ram);
            break;
          case "SSD":
            const ssd = await ssdRepository.searchById(part.id);
            if (ssd) rating = PartRatingService.calculateSSDRating(ssd);
            break;
          case "PSU":
            const psu = await psuRepository.searchById(part.id);
            if (psu) rating = PartRatingService.calculatePSURating(psu);
            break;
          case "MOTHERBOARD":
            const mobo = await motherboardRepository.searchById(part.id);
            if (mobo) rating = PartRatingService.calculateMotherboardRating(mobo);
            break;
          case "CASE":
            const pcCase = await caseRepository.searchById(part.id);
            if (pcCase) rating = PartRatingService.calculateCaseRating(pcCase);
            break;
          case "COOLER":
            const cooler = await coolerRepository.searchById(part.id);
            if (cooler) rating = PartRatingService.calculateCoolerRating(cooler);
            break;
          default:
            rating = part.rating || 0;
        }
        return { ...part, rating };
      })
    );
    return partsWithRating;
  }

  async updatePart(id: number, data: any) {
    const existent = await partRepository.searchById(id);
    if (!existent) throw new Error("Peça não encontrada para atualizar");

    const oldType = existent.type;
    const newType = data.type || oldType;

    if (oldType !== newType) {
      await partRepository.deleteSpecificTypeRelation(id, oldType.toLowerCase());
    }

    await partRepository.update(id, data);

    const updatedPart = await partRepository.searchById(id);

    let rating = 0;
    switch (newType) {
      case "CPU":
        const cpu = await cpuRepository.searchById(id);
        if (cpu) rating = PartRatingService.calculateCPURating(cpu);
        break;
      case "GPU":
        const gpu = await gpuRepository.searchById(id);
        if (gpu) rating = PartRatingService.calculateGPURating(gpu);
        break;
      case "RAM":
        const ram = await ramRepository.searchById(id);
        if (ram) rating = PartRatingService.calculateRAMRating(ram);
        break;
      case "SSD":
        const ssd = await ssdRepository.searchById(id);
        if (ssd) rating = PartRatingService.calculateSSDRating(ssd);
        break;
      case "PSU":
        const psu = await psuRepository.searchById(id);
        if (psu) rating = PartRatingService.calculatePSURating(psu);
        break;
      case "MOTHERBOARD":
        const mobo = await motherboardRepository.searchById(id);
        if (mobo) rating = PartRatingService.calculateMotherboardRating(mobo);
        break;
      case "CASE":
        const pcCase = await caseRepository.searchById(id);
        if (pcCase) rating = PartRatingService.calculateCaseRating(pcCase);
        break;
      case "COOLER":
        const cooler = await coolerRepository.searchById(id);
        if (cooler) rating = PartRatingService.calculateCoolerRating(cooler);
        break;
      default:
        rating = updatedPart?.rating || 0;
    }

    await partRepository.update(id, { rating });

    return { ...updatedPart, rating };
  }

  async deletePart(id: number) {
    const existent = await partRepository.searchById(id);
    if (!existent) throw new Error("Peça não encontrada para deletar");

    return await partRepository.delete(id);
  }
}
