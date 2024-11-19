import React from "react";
import TableServiceOrders from "./_components/table-service-orders";
import CreateServiceOrderModal from "./_components/create-service-order-modal";
import axios from "axios";

export default async function CreateServicesOrdersPage() {

  return (
    <main className="flex flex-col p-5 gap-4 items-end">
      <div className="w-full flex items-center justify-between">
        <h1 className="font-bold text-2xl text-zinc-800">Ordens de Serviço</h1>
        <CreateServiceOrderModal />
      </div>
      <TableServiceOrders />
    </main>
  );
}
