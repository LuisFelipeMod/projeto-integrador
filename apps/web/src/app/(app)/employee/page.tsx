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
import TableEmployee from "./_components/table-employee"

export default function Employee() {
  
  return (
    <main className="flex flex-col p-5 gap-4 items-end">
      <div className="w-full flex items-center justify-between">
        <h1 className="font-bold text-2xl text-zinc-800">Funcionários</h1>
        <InviteEmployee />
      </div>
      <TableEmployee/>
    </main>
  );
}
