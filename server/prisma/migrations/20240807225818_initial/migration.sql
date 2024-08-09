-- CreateTable
CREATE TABLE "tb_tasks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "color_id" INTEGER,
    "favorite" BOOLEAN DEFAULT false,
    CONSTRAINT "tb_tasks_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "tb_colors" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tb_colors" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "color_code" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_tasks_title_key" ON "tb_tasks"("title");

-- CreateIndex
CREATE INDEX "index_color_id" ON "tb_tasks"("color_id");

-- CreateIndex
CREATE UNIQUE INDEX "tb_colors_name_key" ON "tb_colors"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_colors_color_code_key" ON "tb_colors"("color_code");

-- CreateIndex
CREATE INDEX "index_color_name" ON "tb_colors"("name");
