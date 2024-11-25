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
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useState } from "react";

const formSchema = z.object({
  client_cpf_cnpj: z.string().min(1, "CPF/CNPJ é obrigatório"),
  type: z.string().min(1, "Tipo de serviço é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  material_value: z.number().min(0, "Valor do material deve ser maior ou igual a zero"),
  labor_value: z.number().min(0, "Valor da mão de obra deve ser maior ou igual a zero"),
});

type CreateFormSchema = z.infer<typeof formSchema>;

export default function CreateServiceOrderModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [page, setPage] = useState(1);
  const [percent, setPercent] = useState(0);
  const numberOfPage = 2;

  const queryClient = useQueryClient(); 

  const form = useForm<CreateFormSchema>({
    resolver: zodResolver(formSchema),
  });

  const mutation = useMutation(
    async (data: CreateFormSchema) => {
      return await axios.post("http://localhost:4000/service-order", data);
    },
    {
      onSuccess: () => {
        toast.success("Ordem de serviço criada com sucesso!");
        form.reset();
        setPage(1);
        setPercent(0);
        onClose();

        queryClient.invalidateQueries("serviceOrders");
      },
      onError: (error: any) => {
        toast.error(
          error.response?.data?.message || "Ocorreu um erro ao criar a ordem de serviço."
        );
      },
    }
  );

  const alterPage = async () => {
    if (page === numberOfPage) {
      const isValid = await form.trigger();
      if (!isValid) return;

      const formData = form.getValues();
      const data = {
        client_cpf_cnpj: formData.client_cpf_cnpj,
        type: formData.type,
        description: formData.description,
        material_value: Number(formData.material_value),
        labor_value: Number(formData.labor_value),
      };

      mutation.mutate(data);
      return;
    }

    setPage((state) => state + 1);
    setPercent((state) => state + 100 / numberOfPage);
  };

  const displayFormStep = () => {
    switch (page) {
      case 1:
        return (
          <div className="space-y-2">
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="client-cpf-cnpj-input">
                CPF / CNPJ do Cliente
              </label>
              <Input
                id="client-cpf-cnpj-input"
                size="lg"
                {...form.register("client_cpf_cnpj")}
                isInvalid={!!form.formState.errors.client_cpf_cnpj}
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold" htmlFor="type-input">
                Tipo de Serviço
              </label>
              <Input
                id="type-input"
                size="lg"
                {...form.register("type")}
                isInvalid={!!form.formState.errors.type}
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="description-input">
                Descrição do serviço
              </label>
              <Input
                id="description-input"
                size="lg"
                {...form.register("description")}
                isInvalid={!!form.formState.errors.description}
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
                {...form.register("material_value", { valueAsNumber: true })}
                isInvalid={!!form.formState.errors.material_value}
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold" htmlFor="labor-value-input">
                Valor da mão de obra
              </label>
              <Input
                id="labor-value-input"
                size="lg"
                {...form.register("labor_value", { valueAsNumber: true })}
                isInvalid={!!form.formState.errors.labor_value}
              />
            </div>
          </div>
        );
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
              <Progress value={percent} maxValue={100} />
              Criar Ordem de Serviço
            </ModalHeader>
            <ModalBody>
              <form id="create-service-order-form">{displayFormStep()}</form>
            </ModalBody>
            <ModalFooter>
              <Button
                form="create-service-order-form"
                color="primary"
                onPress={() => alterPage()}
                isLoading={mutation.isLoading}
              >
                {page === numberOfPage ? "Cadastrar" : "Próximo"}
                <ChevronRight />
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
