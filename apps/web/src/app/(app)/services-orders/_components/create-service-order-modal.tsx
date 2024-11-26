"use client";

import { Plus, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Progress,
  DateInput,
} from "@nextui-org/react";
import { z } from "zod";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useState } from "react";
import { parseDate } from "@internationalized/date";

const formSchema = z.object({
  client_name: z.string().min(1, "Nome é obrigatório"),
  client_email: z.string().min(1, "Email é obrigatório"),
  client_cpf_cnpj: z.string().min(1, "CPF/CNPJ é obrigatório"),
  type: z.string().min(1, "Tipo de serviço é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  material_value: z.number().min(0, "Valor do material deve ser maior ou igual a zero"),
  labor_value: z.number().min(0, "Valor da mão de obra deve ser maior ou igual a zero"),
  initial_date: z.string().min(1, "Data Inicial é obrigatória"),
  estimated_date: z.string().min(1, "Data Estimada é obrigatória"),
});

type CreateFormSchema = z.infer<typeof formSchema>;

export default function CreateServiceOrderModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [page, setPage] = useState(1);
  const [formValues, setFormValues] = useState<CreateFormSchema>({
    client_name: "",
    client_email: "",
    client_cpf_cnpj: "",
    type: "",
    description: "",
    material_value: 0,
    labor_value: 0,
    initial_date: "",
    estimated_date: "",
  });

  const queryClient = useQueryClient();

  const handleChange = (field: keyof CreateFormSchema, value: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const mutation = useMutation(
    async (data: CreateFormSchema) => {
      return await axios.post("http://localhost:4000/service-order", data);
    },
    {
      onSuccess: () => {
        toast.success("Ordem de serviço criada com sucesso!");
        setFormValues({
          client_name: "",
          client_email: "",
          client_cpf_cnpj: "",
          type: "",
          description: "",
          material_value: 0,
          labor_value: 0,
          initial_date: "",
          estimated_date: "",
        });
        setPage(1);
        onClose();
        queryClient.invalidateQueries("serviceOrders");
      },
      onError: (error: any) => {
        toast.error(
          error.response?.data?.message || "Erro ao criar ordem de serviço."
        );
      },
    }
  );

  const handleSubmit = () => {
    const payload = {
      ...formValues,
      initial_date: formValues.initial_date
        ? new Date(formValues.initial_date).toISOString()
        : "",
      estimated_date: formValues.estimated_date
        ? new Date(formValues.estimated_date).toISOString()
        : "",
    };

    mutation.mutate(payload);
  };

  const alterPage = () => {
    if (page === 2) {
      handleSubmit();
    } else {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const displayFormStep = () => {
    switch (page) {
      case 1:
        return (
          <div className="space-y-2">
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="client-name-input">
                Nome do Cliente
              </label>
              <Input
                id="client-name-input"
                size="lg"
                value={formValues.client_name}
                onChange={(e) => handleChange("client_name", e.target.value)}
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
                value={formValues.client_cpf_cnpj}
                onChange={(e) => handleChange("client_cpf_cnpj", e.target.value)}
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
                value={formValues.type}
                onChange={(e) => handleChange("type", e.target.value)}
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
                value={formValues.description}
                onChange={(e) => handleChange("description", e.target.value)}
                isInvalid={!formValues.description}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-2">
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="material-value-input">
                Valor do Material
              </label>
              <Input
                id="material-value-input"
                size="lg"
                type="number"
                value={String(formValues.material_value)}
                onChange={(e) =>
                  handleChange("material_value", parseFloat(e.target.value))
                }
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
                value={String(formValues.labor_value)}
                onChange={(e) =>
                  handleChange("labor_value", parseFloat(e.target.value))
                }
                isInvalid={formValues.labor_value < 0}
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="initial-date-input">
                Data Inicial
              </label>
              <DateInput
                id="initial-date-input"
                size="lg"
                defaultValue={
                  formValues.initial_date
                    ? parseDate(
                        new Date(formValues.initial_date).toISOString().split("T")[0]
                      )
                    : null
                }
                onChange={(date) => handleChange("initial_date", date?.toString())}
                isInvalid={!formValues.initial_date}
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="estimated-date-input">
                Data Estimada
              </label>
              <DateInput
                id="estimated-date-input"
                size="lg"
                defaultValue={
                  formValues.estimated_date
                    ? parseDate(
                        new Date(formValues.estimated_date).toISOString().split("T")[0]
                      )
                    : null
                }
                onChange={(date) => handleChange("estimated_date", date?.toString())}
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
      <Button onPress={onOpen} className="bg-green-400 text-white">
        <Plus />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-2">
              <Progress value={(page / 2) * 100} maxValue={100} />
              Criar Ordem de Serviço
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
                {page === 2 ? "Cadastrar" : "Próximo"}
                <ChevronRight />
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
