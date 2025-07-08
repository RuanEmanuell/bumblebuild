import { CPU, GPU, RAM, SSD, PSU, Motherboard, Case, Cooler } from '@prisma/client';

export class PartRatingService {
    static calculateCPURating(cpu: CPU): number {
        let score = 0;

        const extraThreads = cpu.threads - cpu.cores;
        const effectiveThreads = cpu.cores + Math.min(extraThreads, cpu.cores) * 0.5;

        score += effectiveThreads * 0.3;
        score += cpu.frequency * 0.4;

        if (!cpu.integratedGraphics) score -= 0.1;

        return Math.min(5, parseFloat(score.toFixed(2)));
    }


    static calculateGPURating(gpu: GPU): number {
        let score = 0;

        score += gpu.memoryGB * 0.1;

        score += gpu.memoryType === 'GDDR7' ? 1 : gpu.memoryType === 'GDDR6' ? 0.5 : 0;

        score += gpu.memoryBus / 256;

        score += gpu.gpuClock * 0.0005;

        return Math.min(5, Math.max(0, parseFloat(score.toFixed(2))));
    }


    static calculateRAMRating(ram: RAM): number {
        let score = 0;

        score += Math.min(ram.capacityGB, 32) * 0.08;

        score += Math.min(ram.frequency, 6000) * 0.00025;

        score += ram.type.includes('DDR5') ? 1 : 0;

        return Math.min(5, parseFloat(score.toFixed(2)));
    }


    static calculateSSDRating(ssd: SSD): number {
        let score = 0;

        score += ssd.capacityGB * 0.003;
        score += ssd.readMBs / 3000;
        score += ssd.writeMBs / 3000;
        score += ssd.type === 'NVMe' ? 1.5 : 0;

        return Math.min(5, parseFloat(score.toFixed(2)));
    }


    static calculatePSURating(psu: PSU): number {
        let score = 0;

        if (psu.powerW >= 850) score += 3;
        else if (psu.powerW >= 750) score += 2;
        else if (psu.powerW >= 600) score += 1;
        else score += 0.5;

        if (psu.certification.includes('Titanium')) score += 2;
        else if (psu.certification.includes('Platinum')) score += 1.5;
        else if (psu.certification.includes('Gold')) score += 1;
        else if (psu.certification.includes('Bronze')) score += 0.5;

        score += psu.modular ? 1 : 0;

        return Math.min(5, parseFloat(score.toFixed(2)));
    }


    static calculateMotherboardRating(mobo: Motherboard): number {
        let score = 0;

        score += mobo.maxRAM >= 128 ? 1.5 :
            mobo.maxRAM >= 64 ? 1 : 0.5;

        score += mobo.slots >= 4 ? 1 : 0.5;

        score += mobo.size === 'ATX' ? 1 :
            mobo.size === 'Micro-ATX' ? 0.75 : 0.5;

        return Math.min(5, parseFloat(score.toFixed(2)));
    }

    static calculateCaseRating(pcCase: Case): number {
        let score = 0;

        if (pcCase.supportedSizes.includes('ATX')) score += 1.5;
        else if (pcCase.supportedSizes.includes('Micro-ATX')) score += 1;
        else if (pcCase.supportedSizes.includes('Mini-ITX')) score += 0.5;

        score += pcCase.maxGpuLengthMM >= 350 ? 1.5 :
            pcCase.maxGpuLengthMM >= 280 ? 1 :
                pcCase.maxGpuLengthMM >= 220 ? 0.5 : 0;

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
