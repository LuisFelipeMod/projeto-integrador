/*
  Warnings:

  - Added the required column `client_email` to the `services-orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client_name` to the `services-orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimated_date` to the `services-orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `initial_date` to the `services-orders` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_services-orders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "client_cpf_cnpj" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "material_value" DECIMAL NOT NULL,
    "labor_value" DECIMAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pendente',
    "client_name" TEXT NOT NULL,
    "client_email" TEXT NOT NULL,
    "initial_date" DATETIME NOT NULL,
    "estimated_date" DATETIME NOT NULL
);
INSERT INTO "new_services-orders" ("client_cpf_cnpj", "description", "id", "labor_value", "material_value", "status", "type") SELECT "client_cpf_cnpj", "description", "id", "labor_value", "material_value", "status", "type" FROM "services-orders";
DROP TABLE "services-orders";
ALTER TABLE "new_services-orders" RENAME TO "services-orders";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
