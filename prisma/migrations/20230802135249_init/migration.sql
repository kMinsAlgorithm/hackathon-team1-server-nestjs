/*
  Warnings:

  - You are about to drop the column `createdAt` on the `InsuranceInfo` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `InsuranceInfo` table. All the data in the column will be lost.
  - Added the required column `insuranceName` to the `InsuranceInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InsuranceInfo" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "insuranceName" TEXT NOT NULL;
