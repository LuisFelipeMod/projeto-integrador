"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  DateInput,
  Progress,
  DatePicker,
} from "@nextui-org/react";
import { Pencil, ChevronRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { parseDate } from "@internationalized/date";

interface UpdateServiceOrderModalProps {
  id: string;
  content: any;
}

export default function UpdateServiceOrderModal({
  id,
  content,
}: UpdateServiceOrderModalProps) {
  const { isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const numberOfPages = 2;
  
  // Inicializando os valores do formulário com os valores fornecidos
  const [formValues, setFormValues] = useState(
    content.reduce((acc: any, field: any) => ({ ...acc, ...field }), {})
  );

  const handleChange = (prop: string, value: string) => {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [prop]: value,
    }));
  };

  const mutation = useMutation(
    async (updatedValues: any) => {
      if (!id) throw new Error("Ordem não encontrada.");
      await axios.patch(`http://localhost:4000/service-order/${id}`, updatedValues);
    },
    {
      onSuccess: () => {
        toast.success("Ordem de serviço editada com sucesso!");
        queryClient.invalidateQueries("serviceOrders");
        onClose();
      },
      onError: (error: any) => {
        console.error("Erro ao editar ordem de serviço:", error);
        toast.error(
          error.response?.data?.message || "Erro ao editar ordem de serviço."
        );
      },
    }
  );

  const handleSubmit = () => {
    mutation.mutate(formValues);
  };

  const alterPage = () => {
    if (page === numberOfPages) {
      handleSubmit();
    } else {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const displayFormStep = () => {
    switch (page) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="client-name-input">
                Nome do Cliente
              </label>
              <Input
                id="client-name-input"
                size="lg"
                value={formValues.client_name}
                onChange={(e) => handleChange("client_name", e.target.value)}
                variant="bordered"
                isInvalid={!formValues.client_name}
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="client-email-input">
                Email do Cliente
              </label>
              <Input
                id="client-email-input"
                size="lg"
                value={formValues.client_email}
                onChange={(e) => handleChange("client_email", e.target.value)}
                variant="bordered"
                isInvalid={!formValues.client_email}
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="client-cpf-cnpj-input">
                CPF / CNPJ do Cliente
              </label>
              <Input
                id="client-cpf-cnpj-input"
                size="lg"
                value={formValues.client_cpf_cnpj || ""}
                onChange={(e) => handleChange("client_cpf_cnpj", e.target.value)}
                variant="bordered"
                isInvalid={!formValues.client_cpf_cnpj}
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="type-input">
                Tipo de Serviço
              </label>
              <Input
                id="type-input"
                size="lg"
                value={formValues.type || ""}
                onChange={(e) => handleChange("type", e.target.value)}
                variant="bordered"
                isInvalid={!formValues.type}
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="description-input">
                Descrição do Serviço
              </label>
              <Input
                id="description-input"
                size="lg"
                value={formValues.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                variant="bordered"
                isInvalid={!formValues.description}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="material-value-input">
                Valor do Material
              </label>
              <Input
                id="material-value-input"
                size="lg"
                type="number"
                value={String(formValues.material_value) || ""}
                onChange={(e) =>
                  handleChange("material_value", e.target.value)
                }
                variant="bordered"
                isInvalid={formValues.material_value < 0}
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="labor-value-input">
                Valor da Mão de Obra
              </label>
              <Input
                id="labor-value-input"
                size="lg"
                type="number"
                value={String(formValues.labor_value) || ""}
                onChange={(e) =>
                  handleChange("labor_value", e.target.value)
                }
                variant="bordered"
                isInvalid={formValues.labor_value < 0}
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="initial-date-input">
                Data Inicial
              </label>
              <DatePicker
                id="initial-date-input"
                size="lg"
                defaultValue={
                  formValues.initial_date
                    ? parseDate(new Date(formValues.initial_date).toISOString().split("T")[0])
                    : null
                }
                onChange={(date) => {
                  if (date) {
                    const isoDate = date.toDate?.("UTC").toISOString().split("T")[0];
                    handleChange("initial_date", isoDate);
                  }
                }}
                isInvalid={!formValues.initial_date}
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="estimated-date-input">
                Data Estimada
              </label>
              <DatePicker
                id="estimated-date-input"
                size="lg"
                defaultValue={
                  formValues.estimated_date
                    ? parseDate(new Date(formValues.estimated_date).toISOString().split("T")[0])
                    : null
                }
                onChange={(date) => {
                  if (date) {
                    const isoDate = date.toDate?.("UTC").toISOString().split("T")[0];
                    handleChange("estimated_date", isoDate);
                  }
                }}
                isInvalid={!formValues.estimated_date}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-transparent px-0 mx-0 w-10 min-w-0"
      >
        <div className="flex p-1 rounded-full bg-blue-500 shadow-blue-500 shadow-md cursor-pointer">
          <Pencil className="w-7 h-7" stroke="white" />
        </div>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" size="xl">
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              <Progress value={(page / numberOfPages) * 100} maxValue={100} />
              Editar Ordem de Serviço
            </ModalHeader>
            <ModalBody>{displayFormStep()}</ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={() => {
                  if (page === 1) {
                    onClose();
                  } else {
                    setPage((prevPage) => prevPage - 1);
                  }
                }}
              >
                {page === 1 ? "Fechar" : "Voltar"}
              </Button>
              <Button
                color="primary"
                onPress={alterPage}
                isLoading={mutation.isLoading}
              >
                {page === numberOfPages ? "Salvar" : "Próximo"}
                <ChevronRight />
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
