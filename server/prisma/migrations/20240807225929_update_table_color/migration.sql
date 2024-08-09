/*
  Warnings:

  - You are about to drop the column `color_code` on the `tb_colors` table. All the data in the column will be lost.
  - Added the required column `code` to the `tb_colors` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tb_colors" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL
);
INSERT INTO "new_tb_colors" ("id", "name") SELECT "id", "name" FROM "tb_colors";
DROP TABLE "tb_colors";
ALTER TABLE "new_tb_colors" RENAME TO "tb_colors";
CREATE UNIQUE INDEX "tb_colors_name_key" ON "tb_colors"("name");
CREATE UNIQUE INDEX "tb_colors_code_key" ON "tb_colors"("code");
CREATE INDEX "index_color_name" ON "tb_colors"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
