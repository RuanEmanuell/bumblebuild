/*
  Warnings:

  - You are about to drop the `LinkPreco` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LinkPreco" DROP CONSTRAINT "LinkPreco_pecaId_fkey";

-- AlterTable
ALTER TABLE "Peca" ADD COLUMN     "linkPreco" TEXT;

-- DropTable
DROP TABLE "LinkPreco";
