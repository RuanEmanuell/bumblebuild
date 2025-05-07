-- CreateTable
CREATE TABLE "Montagem" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "cpuId" INTEGER NOT NULL,
    "gpuId" INTEGER NOT NULL,
    "placaMaeId" INTEGER NOT NULL,
    "ramId" INTEGER NOT NULL,
    "fonteId" INTEGER NOT NULL,
    "ssdId" INTEGER NOT NULL,
    "gabineteId" INTEGER NOT NULL,
    "quantidadeRAM" INTEGER NOT NULL,
    "quantidadeSSD" INTEGER NOT NULL,
    "dataMontagem" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Montagem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Montagem" ADD CONSTRAINT "Montagem_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Montagem" ADD CONSTRAINT "Montagem_cpuId_fkey" FOREIGN KEY ("cpuId") REFERENCES "Peca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Montagem" ADD CONSTRAINT "Montagem_gpuId_fkey" FOREIGN KEY ("gpuId") REFERENCES "Peca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Montagem" ADD CONSTRAINT "Montagem_placaMaeId_fkey" FOREIGN KEY ("placaMaeId") REFERENCES "Peca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Montagem" ADD CONSTRAINT "Montagem_ramId_fkey" FOREIGN KEY ("ramId") REFERENCES "Peca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Montagem" ADD CONSTRAINT "Montagem_fonteId_fkey" FOREIGN KEY ("fonteId") REFERENCES "Peca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Montagem" ADD CONSTRAINT "Montagem_ssdId_fkey" FOREIGN KEY ("ssdId") REFERENCES "Peca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Montagem" ADD CONSTRAINT "Montagem_gabineteId_fkey" FOREIGN KEY ("gabineteId") REFERENCES "Peca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
