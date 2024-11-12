import React from "react";
import TableServiceOrders from "./_components/table-service-orders";
import CreateServiceOrderModal from "./_components/create-service-order-modal";
import axios from "axios";

async function createServiceOrder() {
  const request = await axios.post("http://localhost:4000/service-order", {
    client_cpf_cnpj: "",
    type: "",
    description: "",
    material_value: 0,
    labor_value: 0,
    status: "Pendente"
  })
  return request
} 


async function getServiceOrder() {
  const response = await axios.get(
    "http://localhost:4000/service-order",
  );
  return response
}  

async function updateServiceOrder(id:string){
  const request = await axios.put(`http://localhost:4000/service-order/${id}`, {
    client_cpf_cnpj: "1234",
    type: "put",
    description: "",
    material_value: 0,
    labor_value: 0,
    status: "Concluído"
  })

  return request
}

async function deleteServiceOrder(id:string){
  const request = await axios.delete(`http://localhost:4000/service-order/${id}`)

  return request
}

export default async function CreateServicesOrdersPage() {
  const response = await getServiceOrder();
  const data = response.data;


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
