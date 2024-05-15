-- CreateTable
CREATE TABLE "services-orders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "client_cpf_cnpj" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "material_value" DECIMAL NOT NULL,
    "labor_value" DECIMAL NOT NULL
);
