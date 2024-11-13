"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import { Search, Printer, Pencil, Trash2, Check, Trash } from "lucide-react";

import CreateServiceOrderQuote from "./create-service-order-quote";
import UpdateServiceOrderModal from "./update-service-order-modal";
import axios from "axios";
import { useEffect, useState } from "react";
import DeleteServiceOrderModal from "./delete-service-order-modal";

interface Orders {
  client_cpf_cnpj: string;
  type: string;
  description: string;
  material_value: number;
  labor_value: number;
  status: string;
  id: string;
}

export default function TableServiceOrders() {

  const serviceOrderQuote = {
    clientName: "Teste Nome",
    cpfCnpj: "111.111.111-11",
    email: "teste@gmail.com",
    labor_value: 1000,
    material_value: 40,
    whole_value: 1040,
  };

  const [orders, setOrders] = useState<any>([]);

  useEffect(() => {
    async function fetchOrders() {
      const response = await axios.get("http://localhost:4000/service-order");
      const data = response.data;

      setOrders(data);
    }
    fetchOrders();
  }, []);

  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>CPF/CNPJ</TableColumn>
        <TableColumn>Tipo de Serviço</TableColumn>
        <TableColumn>Descrição</TableColumn>
        <TableColumn>Valor do Material</TableColumn>
        <TableColumn>Valor da Mão de Obra</TableColumn>
        <TableColumn> </TableColumn>
      </TableHeader>
      <TableBody>
        {orders ? (
          orders.map((item: any) => (
            <TableRow key={item.client_cpf_cnpj}>
              <TableCell>{item.client_cpf_cnpj}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.material_value}</TableCell>
              <TableCell>{item.labor_value}</TableCell>
              <TableCell className="flex gap-2">
                <div className="flex p-1 rounded-full bg-yellow-500 shadow-yellow-500  shadow-md cursor-pointer">
                  <Printer className="w-7 h-7" stroke="white" />
                </div>
                <UpdateServiceOrderModal content={[item]} id={item.id}/>
                <DeleteServiceOrderModal id={item.id}/>
                <div className="flex p-1 rounded-full bg-green-500  shadow-green-500 shadow-md cursor-pointer">
                  <Check className="w-7 h-7" stroke="white" />
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <></>
        )}
      </TableBody>
    </Table>
  );
}
