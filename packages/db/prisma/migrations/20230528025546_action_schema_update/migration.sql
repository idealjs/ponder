/*
  Warnings:

  - You are about to drop the column `schemaId` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Action` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Action` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Action` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_schemaId_fkey";

-- AlterTable
ALTER TABLE "Action" DROP COLUMN "schemaId",
DROP COLUMN "url",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_ActionToSchema" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ActionToSchema_AB_unique" ON "_ActionToSchema"("A", "B");

-- CreateIndex
CREATE INDEX "_ActionToSchema_B_index" ON "_ActionToSchema"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Action_name_key" ON "Action"("name");

-- AddForeignKey
ALTER TABLE "_ActionToSchema" ADD CONSTRAINT "_ActionToSchema_A_fkey" FOREIGN KEY ("A") REFERENCES "Action"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActionToSchema" ADD CONSTRAINT "_ActionToSchema_B_fkey" FOREIGN KEY ("B") REFERENCES "Schema"("id") ON DELETE CASCADE ON UPDATE CASCADE;
