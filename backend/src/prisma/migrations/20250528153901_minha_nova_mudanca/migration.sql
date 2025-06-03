/*
  Warnings:

  - You are about to drop the `PasswordRecoveryToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PasswordRecoveryToken" DROP CONSTRAINT "PasswordRecoveryToken_userId_fkey";

-- DropTable
DROP TABLE "PasswordRecoveryToken";
