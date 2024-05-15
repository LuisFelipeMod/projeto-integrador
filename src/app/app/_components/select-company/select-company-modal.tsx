"use client";

import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { ColumnDef } from "@tanstack/react-table";
import { useUserStore } from "../../stores/user-store";
import { DataTable } from "./data-table";
import { Crown, User } from "lucide-react";
import { columns } from "./columns";
import { useCompanyStore } from "../../stores/company-store";
import { useState } from "react";

export interface Company {
  id: string;
  cnpj_cpf: string;
  name: string;
  isOwner: boolean;
}

export default function SelectCompanyModal() {
  const [selectedInList, setSelectedInList] = useState<Company>();
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useUserStore();
  const { selectedCompany, setSelectedCompany } = useCompanyStore();

  const companies: Company[] = [];

  user?.companies_owner.forEach((company) => {
    companies.push({
      id: company.id,
      cnpj_cpf: company.cnpj_cpf,
      name: company.corporate_name,
      isOwner: true,
    });
  });

  const selectCompany = (data?: Company) => {
    const selectedCompany = data ? data : selectedInList;
    setSelectedCompany(selectedCompany!)
    setIsOpen(false)
  };

  return (
    <>
      <Tooltip content="Alterar Empresa">
        <Button
          onPress={() => setIsOpen(true)}
          className="bg-dark-300 flex gap-2 p-0 text-light-100"
        >
          <Avatar src={user?.image ? user.image : "https://xsgames.co/randomusers/avatar.php?g=pixel"} />
          <div>
            <strong>{user!.name}</strong>
            <p className="text-xs">{selectedCompany?.name}</p>
          </div>
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Selecionar empresa
              </ModalHeader>
              <ModalBody>
                <DataTable
                  selectedRow={(data) => setSelectedInList(data)}
                  selectionAction={(data) => selectCompany(data)}
                  columns={columns}
                  data={companies}
                />
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose} variant="light">Cancelar</Button>
                <Button color="primary" onPress={() => selectCompany()}>
                  Selecionar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
