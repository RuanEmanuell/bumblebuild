-- CreateTable
CREATE TABLE "LinkPreco" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "preco" DOUBLE PRECISION,
    "atualizadoEm" TIMESTAMP(3),
    "pecaId" INTEGER NOT NULL,

    CONSTRAINT "LinkPreco_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LinkPreco" ADD CONSTRAINT "LinkPreco_pecaId_fkey" FOREIGN KEY ("pecaId") REFERENCES "Peca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
