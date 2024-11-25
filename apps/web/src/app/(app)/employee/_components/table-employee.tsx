"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import UpdateEmployeeModal from "./update-employee-modal";
import DeleteEmployeeModal from "./delete-employee-modal";
import { useQuery } from "react-query";
import { useCompanyStore } from "@/stores/company-store";
import axios from "axios";

interface Employee {
  id: string;
  position: string;
  startDate: string;
  endDate: string | null;
}

export default function TableEmployee() {
  const { selectedCompany } = useCompanyStore();
  const selectedCompanyId = String(selectedCompany?.id);

  const fetchEmployees = async (): Promise<Employee[]> => {
    const response = await axios.get(
      `http://localhost:4000/employee/${selectedCompanyId}`
    );
    return response.data;
  };

  const {
    data: employees,
    isLoading,
    isError,
  } = useQuery("employees", fetchEmployees);

  const formatedDate = (date: string | null) => {
    if (!date) return "N/A";
    
    return date.split("T")[0].split("-").reverse().join("/");
  };

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar os dados dos funcionários.</p>;

  return (
    <Table aria-label="Tabela de Funcionários">
      <TableHeader>
        <TableColumn>Cargo</TableColumn>
        <TableColumn>Data de Admissão</TableColumn>
        <TableColumn>Data de Demissão</TableColumn>
        <TableColumn>Ações</TableColumn>
      </TableHeader>
      <TableBody>
        {(employees ?? []).map((employee: Employee) => (
          <TableRow key={employee.id}>
            <TableCell>{employee.position}</TableCell>
            <TableCell>{formatedDate(employee.startDate)}</TableCell>
            <TableCell>{formatedDate(employee.endDate)}</TableCell>
            <TableCell className="flex gap-2">
              <UpdateEmployeeModal content={employee} id={employee.id} />
              <DeleteEmployeeModal id={employee.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
