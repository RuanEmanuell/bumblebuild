/*
  Warnings:

  - You are about to drop the column `name` on the `CPU` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CPU" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "Part" ALTER COLUMN "name" DROP NOT NULL;
