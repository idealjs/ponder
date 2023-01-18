/*
  Warnings:

  - You are about to drop the `_SchemaToTransition` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SchemaToTransition" DROP CONSTRAINT "_SchemaToTransition_A_fkey";

-- DropForeignKey
ALTER TABLE "_SchemaToTransition" DROP CONSTRAINT "_SchemaToTransition_B_fkey";

-- AlterTable
ALTER TABLE "Schema" ADD COLUMN     "transitionId" TEXT;

-- DropTable
DROP TABLE "_SchemaToTransition";

-- AddForeignKey
ALTER TABLE "Schema" ADD CONSTRAINT "Schema_transitionId_fkey" FOREIGN KEY ("transitionId") REFERENCES "Transition"("id") ON DELETE SET NULL ON UPDATE CASCADE;
