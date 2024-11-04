"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import {
  Search,
  Printer,
  Pencil,
  Trash2,
  CircleCheck,
  Trash,
} from "lucide-react";

interface Orders {
  client_cpf_cnpj: string;
  type: string;
  description: string;
  material_value: number;
  labor_value: number;
  status: string;
}

export default function TableServiceOrders() {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Nome</TableColumn>
        <TableColumn>CPF</TableColumn>
        <TableColumn>Cargo</TableColumn>
        <TableColumn>
          <div className="w-full max-w-sm min-w-[200px]">
            <div className="relative">
              <input
                type="search"
                className="w-full bg-transparent placeholder:text-black-400 text-black-700 text-sm border-b pb-1 pt-2 border-black "
                placeholder="Pesquise aqui"
              />
              <button
                className="absolute top-1 right-1 flex items-center py-1"
                type="button"
              >
                <Search />
              </button>
            </div>
          </div>
        </TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>Tony Reichert</TableCell>
          <TableCell>111.111.111-11</TableCell>
          <TableCell>Técnico em Informática</TableCell>
          <TableCell className="flex">
            <Printer className="cursor-pointer"/>
            <Pencil className="cursor-pointer"/>
            <Trash2 className="cursor-pointer"/>
            <CircleCheck className="cursor-pointer"/>
            <Trash />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
