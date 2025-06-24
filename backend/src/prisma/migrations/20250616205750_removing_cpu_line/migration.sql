/*
  Warnings:

  - You are about to drop the column `line` on the `CPU` table. All the data in the column will be lost.
  - You are about to drop the column `cpuCompatibilityLine` on the `Motherboard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CPU" DROP COLUMN "line";

-- AlterTable
ALTER TABLE "Motherboard" DROP COLUMN "cpuCompatibilityLine";
