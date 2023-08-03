/*
  Warnings:

  - You are about to drop the `INSURANCE_LOGO` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "INSURANCE_LOGO";

-- CreateTable
CREATE TABLE "INSURANCE_LOGOS" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "INSURANCE_LOGOS_pkey" PRIMARY KEY ("id")
);
