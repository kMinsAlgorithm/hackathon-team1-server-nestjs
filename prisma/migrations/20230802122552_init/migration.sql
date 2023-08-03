/*
  Warnings:

  - Added the required column `filename` to the `InsuranceLogo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InsuranceLogo" ADD COLUMN     "filename" TEXT NOT NULL;
