/*
  Warnings:

  - You are about to drop the column `transitionId` on the `Schema` table. All the data in the column will be lost.
  - You are about to drop the column `startFromStateId` on the `Transition` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Schema" DROP CONSTRAINT "Schema_transitionId_fkey";

-- DropForeignKey
ALTER TABLE "Transition" DROP CONSTRAINT "Transition_startFromStateId_fkey";

-- AlterTable
ALTER TABLE "Schema" DROP COLUMN "transitionId";

-- AlterTable
ALTER TABLE "State" ADD COLUMN     "transitionId" TEXT;

-- AlterTable
ALTER TABLE "Transition" DROP COLUMN "startFromStateId";

-- CreateTable
CREATE TABLE "_SchemaToTransition" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SchemaToTransition_AB_unique" ON "_SchemaToTransition"("A", "B");

-- CreateIndex
CREATE INDEX "_SchemaToTransition_B_index" ON "_SchemaToTransition"("B");

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_transitionId_fkey" FOREIGN KEY ("transitionId") REFERENCES "Transition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SchemaToTransition" ADD CONSTRAINT "_SchemaToTransition_A_fkey" FOREIGN KEY ("A") REFERENCES "Schema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SchemaToTransition" ADD CONSTRAINT "_SchemaToTransition_B_fkey" FOREIGN KEY ("B") REFERENCES "Transition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
