/*
  Warnings:

  - You are about to drop the column `schemaId` on the `Transition` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transition" DROP CONSTRAINT "Transition_schemaId_fkey";

-- AlterTable
ALTER TABLE "State" ADD COLUMN     "isStartState" BOOLEAN;

-- AlterTable
ALTER TABLE "Transition" DROP COLUMN "schemaId";

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
ALTER TABLE "_SchemaToTransition" ADD CONSTRAINT "_SchemaToTransition_A_fkey" FOREIGN KEY ("A") REFERENCES "Schema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SchemaToTransition" ADD CONSTRAINT "_SchemaToTransition_B_fkey" FOREIGN KEY ("B") REFERENCES "Transition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
