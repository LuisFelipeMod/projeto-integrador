"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import InviteEmployee from "./_components/invite-employee";
import InviteEmployeeModal from "./_components/invite-employee-modal";

export default function Employee() {
  return (
    <main className="flex flex-col w-screen p-5 gap-4 items-end">
      <div className="w-full flex items-center justify-between">
        <h1 className="font-bold text-2xl text-zinc-800">Funcionários</h1>
        <InviteEmployee />
      </div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Nome</TableColumn>
          <TableColumn>CPF</TableColumn>
          <TableColumn>Cargo</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Tony Reichert</TableCell>
            <TableCell>111.111.111-11</TableCell>
            <TableCell>Técnico em Informática</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Zoey Lang</TableCell>
            <TableCell>222.222.222-22</TableCell>
            <TableCell>Auxiliar de Técnico em Informática</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Jane Fisher</TableCell>
            <TableCell>333.333.333-33</TableCell>
            <TableCell>Técnico em Informática</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>William Howard</TableCell>
            <TableCell>444.444.444-44</TableCell>
            <TableCell>Técnico em Informática</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </main>
  );
}
