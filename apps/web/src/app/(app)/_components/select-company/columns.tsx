import type { ColumnDef } from "@tanstack/react-table";
import type { Company } from "@/@types/company";
import { Crown, User } from "lucide-react";

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "id",
  },
  {
    accessorKey: "isOwner",
    header: "",
    cell: ({ cell }) => {
      const isOwner = cell.getValue();
      return isOwner ? <Crown className="text-yellow-500" /> : <User />;
    },
  },
  {
    accessorKey: "cnpj_cpf",
    header: "CPF/CNPJ",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  // {
  //   accessorKey: "actions",
  //   header: "",
  //   cell: ({ cell }) => {
  //     const isOwner = cell.getValue()
  //     return isOwner ? <Crown className="text-yellow-500" /> : <User />
  //   }
  // }
];
