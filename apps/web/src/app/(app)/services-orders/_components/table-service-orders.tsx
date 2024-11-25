"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import { Printer, Check } from "lucide-react";
import CreateServiceOrderQuote from "./create-service-order-quote";
import UpdateServiceOrderModal from "./update-service-order-modal";
import DeleteServiceOrderModal from "./delete-service-order-modal";
import { useQuery } from "react-query";
import axios from "axios";

interface Orders {
  client_cpf_cnpj: string;
  type: string;
  description: string;
  material_value: number;
  labor_value: number;
  status: string;
  id: string;
}

const fetchOrders = async (): Promise<Orders[]> => {
  const response = await axios.get("http://localhost:4000/service-order");
  return response.data;
};

export default function TableServiceOrders() {
  const { data: orders, isLoading, isError } = useQuery("serviceOrders", fetchOrders);

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Ocorreu um erro ao buscar os dados.</p>;

  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>CPF/CNPJ</TableColumn>
        <TableColumn>Tipo de Serviço</TableColumn>
        <TableColumn>Descrição</TableColumn>
        <TableColumn>Valor do Material</TableColumn>
        <TableColumn>Valor da Mão de Obra</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Ações</TableColumn>
      </TableHeader>
      <TableBody>
        {orders ? (
          orders.map((item: any) => {
            const serviceOrderQuote = {
              id: item.id,
              clientName: "Teste Nome",
              cpfCnpj: item.client_cpf_cnpj,
              email: "teste@gmail.com",
              labor_value: item.labor_value,
              material_value: item.material_value,
              whole_value: Number(item.material_value) + Number(item.labor_value),
            };

            return (
              <TableRow key={item.client_cpf_cnpj}>
                <TableCell>{item.client_cpf_cnpj}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.material_value}</TableCell>
                <TableCell>{item.labor_value}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell className="flex gap-2">
                  <div className="flex p-1 rounded-full bg-yellow-500 shadow-yellow-500  shadow-md cursor-pointer">
                    {/* <Printer className="w-7 h-7" stroke="white" /> */}
                    <CreateServiceOrderQuote ServiceOrderQuote={serviceOrderQuote} />
                  </div>
                  <UpdateServiceOrderModal content={[item]} id={item.id}/>
                  <DeleteServiceOrderModal id={item.id}/>
                  <div className="flex p-1 rounded-full bg-green-500  shadow-green-500 shadow-md cursor-pointer">
                    <Check className="w-7 h-7" stroke="white" />
                  </div>
                </TableCell>
              </TableRow>
            )
          })
        ) : (
          <></>
        )}
      </TableBody>
    </Table>
  );
}
