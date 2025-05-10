-- CreateEnum
CREATE TYPE "PartType" AS ENUM ('CPU', 'GPU', 'RAM', 'SSD', 'PSU', 'CASE', 'MOTHERBOARD', 'COOLER');

-- CreateTable
CREATE TABLE "PasswordRecoveryToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiredAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasswordRecoveryToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "userType" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "profilePictureUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Part" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "type" "PartType" NOT NULL,
    "imageUrl" TEXT,
    "priceLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Part_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CPU" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "socket" TEXT NOT NULL,
    "line" TEXT NOT NULL,
    "cores" INTEGER NOT NULL,
    "threads" INTEGER NOT NULL,
    "frequency" DOUBLE PRECISION NOT NULL,
    "tdp" INTEGER NOT NULL,
    "integratedGraphics" BOOLEAN NOT NULL,

    CONSTRAINT "CPU_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GPU" (
    "id" INTEGER NOT NULL,
    "memoryGB" INTEGER NOT NULL,
    "memoryType" TEXT NOT NULL,
    "tdp" INTEGER NOT NULL,
    "lengthMM" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "GPU_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RAM" (
    "id" INTEGER NOT NULL,
    "capacityGB" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "frequency" INTEGER NOT NULL,

    CONSTRAINT "RAM_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SSD" (
    "id" INTEGER NOT NULL,
    "capacityGB" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "readMBs" INTEGER NOT NULL,
    "writeMBs" INTEGER NOT NULL,

    CONSTRAINT "SSD_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PSU" (
    "id" INTEGER NOT NULL,
    "powerW" INTEGER NOT NULL,
    "certification" TEXT NOT NULL,
    "modular" BOOLEAN NOT NULL,

    CONSTRAINT "PSU_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Case" (
    "id" INTEGER NOT NULL,
    "supportedSizes" TEXT NOT NULL,
    "maxGpuLengthMM" INTEGER NOT NULL,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cooler" (
    "id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "socketSupport" TEXT NOT NULL,

    CONSTRAINT "Cooler_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Motherboard" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "socket" TEXT NOT NULL,
    "chipset" TEXT NOT NULL,
    "ramType" TEXT NOT NULL,
    "slots" INTEGER NOT NULL,
    "maxRAM" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "cpuCompatibilityLine" TEXT NOT NULL,

    CONSTRAINT "Motherboard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PasswordRecoveryToken_token_key" ON "PasswordRecoveryToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "PasswordRecoveryToken" ADD CONSTRAINT "PasswordRecoveryToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CPU" ADD CONSTRAINT "CPU_id_fkey" FOREIGN KEY ("id") REFERENCES "Part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GPU" ADD CONSTRAINT "GPU_id_fkey" FOREIGN KEY ("id") REFERENCES "Part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RAM" ADD CONSTRAINT "RAM_id_fkey" FOREIGN KEY ("id") REFERENCES "Part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SSD" ADD CONSTRAINT "SSD_id_fkey" FOREIGN KEY ("id") REFERENCES "Part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PSU" ADD CONSTRAINT "PSU_id_fkey" FOREIGN KEY ("id") REFERENCES "Part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_id_fkey" FOREIGN KEY ("id") REFERENCES "Part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cooler" ADD CONSTRAINT "Cooler_id_fkey" FOREIGN KEY ("id") REFERENCES "Part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motherboard" ADD CONSTRAINT "Motherboard_id_fkey" FOREIGN KEY ("id") REFERENCES "Part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
