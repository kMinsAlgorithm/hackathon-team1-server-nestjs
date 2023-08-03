/*
  Warnings:

  - The primary key for the `INSURANCE_LOGOS` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "INSURANCE_LOGOS" DROP CONSTRAINT "INSURANCE_LOGOS_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "INSURANCE_LOGOS_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "INSURANCE_LOGOS_id_seq";
