/*
  Warnings:

  - You are about to drop the `Montagem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Montagem" DROP CONSTRAINT "Montagem_cpuId_fkey";

-- DropForeignKey
ALTER TABLE "Montagem" DROP CONSTRAINT "Montagem_fonteId_fkey";

-- DropForeignKey
ALTER TABLE "Montagem" DROP CONSTRAINT "Montagem_gabineteId_fkey";

-- DropForeignKey
ALTER TABLE "Montagem" DROP CONSTRAINT "Montagem_gpuId_fkey";

-- DropForeignKey
ALTER TABLE "Montagem" DROP CONSTRAINT "Montagem_placaMaeId_fkey";

-- DropForeignKey
ALTER TABLE "Montagem" DROP CONSTRAINT "Montagem_ramId_fkey";

-- DropForeignKey
ALTER TABLE "Montagem" DROP CONSTRAINT "Montagem_ssdId_fkey";

-- DropForeignKey
ALTER TABLE "Montagem" DROP CONSTRAINT "Montagem_usuarioId_fkey";

-- DropTable
DROP TABLE "Montagem";
