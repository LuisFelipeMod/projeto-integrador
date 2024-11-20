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

import UpdateEmployeeModal from "./update-employee-modal";
import axios from "axios";
import { useEffect, useState } from "react";
import DeleteEmployeeModal from "./delete-employee-modal";
import { useCompanyStore } from "@/stores/company-store";

interface Orders {
  client_cpf_cnpj: string;
  type: string;
  description: string;
  material_value: number;
  labor_value: number;
  status: string;
  id: string;
}

export default function TableEmployee() {
  const [orders, setOrders] = useState<any>([]);
  const { selectedCompany } = useCompanyStore();

  useEffect(() => {
    async function fetchOrders() {
      const response = await axios.get("http://localhost:4000/employee");
      const data = response.data;

      setOrders(data);
    }
    fetchOrders();
  }, []);

  const formatedDate = (date:any) => {
    const convertedDate = new Date(date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );

    return convertedDate
  } 
 
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Cargo</TableColumn>
        <TableColumn>Data de Admissão</TableColumn>
        <TableColumn>Data de Demissão</TableColumn>
        <TableColumn> </TableColumn>
      </TableHeader>
      <TableBody>
        {orders ? (
          orders.map((item: any, key: number) => (
            <TableRow key={key}>
              <TableCell>{item.position}</TableCell>
              <TableCell>{formatedDate(item.startDate)}</TableCell>
              <TableCell>{formatedDate(item.endDate)}</TableCell>
              <TableCell className="flex gap-2">
                <UpdateEmployeeModal content={[item]} id={item.id} />
                <DeleteEmployeeModal id={item.id} />
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
