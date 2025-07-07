import { CPU, GPU, RAM, SSD, PSU, Motherboard, Case, Cooler } from '@prisma/client';

export class PartRatingService {
    static calculateCPURating(cpu: CPU): number {
        let score = 0;

        score += cpu.cores * 1;
        score += cpu.threads * 0.5;
        score += cpu.frequency * 1.2;

        if (!cpu.integratedGraphics) score -= 0.25;

        return Math.min(5, parseFloat(score.toFixed(2)));
    }

    static calculateGPURating(gpu: GPU): number {
        let score = 0;

        score += gpu.memoryGB * 0.1;

        score += gpu.memoryType === 'GDDR7' ? 1.5 : gpu.memoryType === 'GDDR6' ? 1 : 0;

        score += gpu.memoryBus / 256;

        score += gpu.gpuClock * 0.0005;

        return Math.min(5, Math.max(0, parseFloat(score.toFixed(2))));
    }


    static calculateRAMRating(ram: RAM): number {
        let score = 0;

        score += ram.capacityGB * 0.3;
        score += ram.frequency * 0.001;
        score += ram.type.includes('DDR5') ? 0.5 : 0;

        return Math.min(5, parseFloat(score.toFixed(2)));
    }

    static calculateSSDRating(ssd: SSD): number {
        let score = 0;

        score += ssd.capacityGB * 0.01;
        score += ssd.readMBs / 1000;
        score += ssd.writeMBs / 1000;
        score += ssd.type === 'NVMe' ? 1 : 0;

        return Math.min(5, parseFloat(score.toFixed(2)));
    }

    static calculatePSURating(psu: PSU): number {
        let score = 0;

        score += psu.powerW >= 650 ? 1 : 0.5;
        score += psu.certification.includes('Gold') ? 1 : 0.5;
        score += psu.modular ? 1 : 0;

        return Math.min(5, parseFloat(score.toFixed(2)));
    }

    static calculateMotherboardRating(mobo: Motherboard): number {
        let score = 0;

        score += mobo.maxRAM >= 64 ? 1 : 0.5;
        score += mobo.slots >= 4 ? 1 : 0.5;
        score += mobo.size === 'ATX' ? 1 : 0.5;

        return Math.min(5, parseFloat(score.toFixed(2)));
    }

    static calculateCaseRating(pcCase: Case): number {
        let score = 0;

        score += pcCase.supportedSizes.includes('ATX') ? 1 :
            (pcCase.supportedSizes.includes('Micro-ATX') || pcCase.supportedSizes.includes('Mini-ITX')) ? 0.5 : 0;

        score += pcCase.maxGpuLengthMM >= 350 ? 1.5 :
            pcCase.maxGpuLengthMM >= 300 ? 1 :
                pcCase.maxGpuLengthMM >= 250 ? 0.5 : 0;

        return Math.min(5, parseFloat(score.toFixed(2)));
    }

    static calculateCoolerRating(cooler: Cooler): number {
        let score = 0;

        score += cooler.type === 'Liquid' ? 2 :
            cooler.type === 'Air' ? 1 : 0.5;

        const noiseScore = 1 - ((cooler.noiseLevel - 10) / 40);
        score += noiseScore < 0 ? 0 : noiseScore > 1 ? 1 : noiseScore;

        score += cooler.maxTdp >= 120 ? 2 :
            cooler.maxTdp >= 95 ? 1 : 0.5;

        return Math.min(5, parseFloat(score.toFixed(2)));
    }

}
