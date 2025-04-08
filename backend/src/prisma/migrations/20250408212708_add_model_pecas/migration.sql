-- CreateEnum
CREATE TYPE "TipoPeca" AS ENUM ('CPU', 'GPU', 'RAM', 'SSD', 'FONTE', 'GABINETE', 'PLACA_MAE', 'COOLER');

-- CreateTable
CREATE TABLE "Peca" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "tipo" "TipoPeca" NOT NULL,
    "imagemUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Peca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CPU" (
    "id" INTEGER NOT NULL,
    "socket" TEXT NOT NULL,
    "nucleos" INTEGER NOT NULL,
    "threads" INTEGER NOT NULL,
    "frequencia" DOUBLE PRECISION NOT NULL,
    "tdp" INTEGER NOT NULL,
    "graficosIntegrados" BOOLEAN NOT NULL,

    CONSTRAINT "CPU_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GPU" (
    "id" INTEGER NOT NULL,
    "memoriaGB" INTEGER NOT NULL,
    "tipoMemoria" TEXT NOT NULL,
    "tdp" INTEGER NOT NULL,

    CONSTRAINT "GPU_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RAM" (
    "id" INTEGER NOT NULL,
    "capacidadeGB" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "frequencia" INTEGER NOT NULL,

    CONSTRAINT "RAM_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SSD" (
    "id" INTEGER NOT NULL,
    "capacidadeGB" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "leituraMBs" INTEGER NOT NULL,
    "escritaMBs" INTEGER NOT NULL,

    CONSTRAINT "SSD_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fonte" (
    "id" INTEGER NOT NULL,
    "potenciaW" INTEGER NOT NULL,
    "certificacao" TEXT NOT NULL,
    "modular" BOOLEAN NOT NULL,

    CONSTRAINT "Fonte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gabinete" (
    "id" INTEGER NOT NULL,
    "tamanhoSuportado" TEXT NOT NULL,
    "comVidro" BOOLEAN NOT NULL,

    CONSTRAINT "Gabinete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cooler" (
    "id" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "suporteSocket" TEXT NOT NULL,

    CONSTRAINT "Cooler_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlacaMae" (
    "id" INTEGER NOT NULL,
    "socket" TEXT NOT NULL,
    "tipoRAM" TEXT NOT NULL,
    "slotsRAM" INTEGER NOT NULL,
    "maxRAM" INTEGER NOT NULL,
    "tamanho" TEXT NOT NULL,

    CONSTRAINT "PlacaMae_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CPU" ADD CONSTRAINT "CPU_id_fkey" FOREIGN KEY ("id") REFERENCES "Peca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GPU" ADD CONSTRAINT "GPU_id_fkey" FOREIGN KEY ("id") REFERENCES "Peca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RAM" ADD CONSTRAINT "RAM_id_fkey" FOREIGN KEY ("id") REFERENCES "Peca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SSD" ADD CONSTRAINT "SSD_id_fkey" FOREIGN KEY ("id") REFERENCES "Peca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fonte" ADD CONSTRAINT "Fonte_id_fkey" FOREIGN KEY ("id") REFERENCES "Peca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gabinete" ADD CONSTRAINT "Gabinete_id_fkey" FOREIGN KEY ("id") REFERENCES "Peca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cooler" ADD CONSTRAINT "Cooler_id_fkey" FOREIGN KEY ("id") REFERENCES "Peca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlacaMae" ADD CONSTRAINT "PlacaMae_id_fkey" FOREIGN KEY ("id") REFERENCES "Peca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
