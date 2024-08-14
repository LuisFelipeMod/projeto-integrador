-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_services-orders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "client_cpf_cnpj" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "material_value" DECIMAL NOT NULL,
    "labor_value" DECIMAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pendente'
);
INSERT INTO "new_services-orders" ("client_cpf_cnpj", "description", "id", "labor_value", "material_value", "status", "type") SELECT "client_cpf_cnpj", "description", "id", "labor_value", "material_value", "status", "type" FROM "services-orders";
DROP TABLE "services-orders";
ALTER TABLE "new_services-orders" RENAME TO "services-orders";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
