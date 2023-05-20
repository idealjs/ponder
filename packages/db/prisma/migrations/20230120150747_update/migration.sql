/*
  Warnings:

  - A unique constraint covering the columns `[startFromStateId]` on the table `Transition` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "State" DROP CONSTRAINT "State_transitionId_fkey";

-- DropForeignKey
ALTER TABLE "Transition" DROP CONSTRAINT "Transition_actionId_fkey";

-- AlterTable
ALTER TABLE "State" ADD COLUMN     "positionX" INTEGER,
ADD COLUMN     "positionY" INTEGER;

-- AlterTable
ALTER TABLE "Transition" ADD COLUMN     "startFromStateId" TEXT,
ALTER COLUMN "actionId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Transition_startFromStateId_key" ON "Transition"("startFromStateId");

-- AddForeignKey
ALTER TABLE "Transition" ADD CONSTRAINT "Transition_startFromStateId_fkey" FOREIGN KEY ("startFromStateId") REFERENCES "State"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transition" ADD CONSTRAINT "Transition_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "Action"("id") ON DELETE SET NULL ON UPDATE CASCADE;
