"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";

interface Cells {
  [key: string]: string[] | undefined;
}

const columns = ["OS", "Proprietário", "Celular", "Garantia", "Defeito diagnosticado", "Status"];

const cells: Cells = {
  key1: ["1", "José Carlos", "Motorola Moto g5", "27/03/2023", "Celular com a tela quebrada e o touch não funciona", "Feito"],
  key2: ["2", "Maria Socorro", "Iphone 7 Plus", "27/03/2023", "Celular com a tela quebrada e o touch não funciona", "Feito"],
  key3: ["3", "Lin Rab", "Redmi Note 13", "29/03/2023", "Celular com a tela quebrada e o touch não funciona", "A fazer"],
};

const renderRows = () => {
  const rows = [];

  for (const prop in cells) {
    const key = prop.replace("key", "");
    const propArray: any = cells[prop];

    rows.push(
      <TableRow key={key}>
        {propArray?.map((value: string, key: string) => {
          return <TableCell key={key}>{value}</TableCell>;
        })}
      </TableRow>
    );
  }

  return rows;
};

export default function CompanyTable() {
  return (
    <>
      <Table aria-label="Example static collection table">
        <TableHeader>
          {columns.map((name, key) => {
            return <TableColumn className="text-dark-300" key={key}>{name}</TableColumn>;
          })}
        </TableHeader>
        <TableBody>{renderRows()}</TableBody>
      </Table>
    </>
  );
}
