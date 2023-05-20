/*
  Warnings:

  - You are about to drop the column `startFromStateId` on the `Transition` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[transitionId]` on the table `State` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Transition" DROP CONSTRAINT "Transition_startFromStateId_fkey";

-- DropIndex
DROP INDEX "Transition_startFromStateId_key";

-- AlterTable
ALTER TABLE "State" ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "Transition" DROP COLUMN "startFromStateId";

-- CreateIndex
CREATE UNIQUE INDEX "State_transitionId_key" ON "State"("transitionId");

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_transitionId_fkey" FOREIGN KEY ("transitionId") REFERENCES "Transition"("id") ON DELETE SET NULL ON UPDATE CASCADE;
