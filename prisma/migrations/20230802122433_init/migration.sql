/*
  Warnings:

  - You are about to drop the `INSURANCE_LOGOS` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "INSURANCE_LOGOS";

-- CreateTable
CREATE TABLE "InsuranceLogo" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "InsuranceLogo_pkey" PRIMARY KEY ("id")
);
