/*
  Warnings:

  - Added the required column `maxTdp` to the `Cooler` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noiseLevel` to the `Cooler` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gpuClock` to the `GPU` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memoryBus` to the `GPU` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cooler" ADD COLUMN     "maxTdp" INTEGER NOT NULL,
ADD COLUMN     "noiseLevel" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "GPU" ADD COLUMN     "gpuClock" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "memoryBus" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Part" ADD COLUMN     "rating" DOUBLE PRECISION;
