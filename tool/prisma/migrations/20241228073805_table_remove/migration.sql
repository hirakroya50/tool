-- CreateTable
CREATE TABLE "Hirak" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hirak_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Hirak_name_idx" ON "Hirak"("name");
