/*
  Warnings:

  - The primary key for the `InsuranceLogo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `InsuranceLogo` table. All the data in the column will be lost.
  - The required column `logoId` was added to the `InsuranceLogo` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "InsuranceLogo" DROP CONSTRAINT "InsuranceLogo_pkey",
DROP COLUMN "id",
ADD COLUMN     "logoId" TEXT NOT NULL,
ADD CONSTRAINT "InsuranceLogo_pkey" PRIMARY KEY ("logoId");

-- CreateTable
CREATE TABLE "InsuranceInfo" (
    "infoId" TEXT NOT NULL,
    "logoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InsuranceInfo_pkey" PRIMARY KEY ("infoId")
);

-- AddForeignKey
ALTER TABLE "InsuranceInfo" ADD CONSTRAINT "InsuranceInfo_logoId_fkey" FOREIGN KEY ("logoId") REFERENCES "InsuranceLogo"("logoId") ON DELETE RESTRICT ON UPDATE CASCADE;
