export interface Build {
    id: number;
    userId: number;
    cpuId: number;
    gpuId: number;
    motherboardId: number;
    ramId: number;
    psuId: number;
    ssdId: number;
    caseId: number;
    ramQuantity: number;
    ssdQuantity: number;
    buildDate: Date;
}
