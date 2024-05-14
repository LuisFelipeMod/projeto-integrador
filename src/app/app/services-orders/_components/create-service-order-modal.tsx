"use client";

import { Plus, Clipboard, Send, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Divider,
  Progress,
} from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  client_cpf_cnpj: z.string(),
  type: z.string(),
  description: z.string(),
  material_value: z.number(),
  labor_value: z.number(),
});

type CreateFormSchema = z.infer<typeof formSchema>;

export default function CreateServiceOrder() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [page, setPage] = useState(1);

  const [percent, setPercent] = useState(0);

  const numberOfPage = 2;

  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  // });

  const form = useForm<CreateFormSchema>({
    resolver: zodResolver(formSchema),
  });

  const alterPage = async () => {
    if (page === numberOfPage) {
      const data = form.getValues();
      await fetch("/api/service-order", {
        method: "POST",
        body: JSON.stringify(data),
      });

      onClose();
      // setIsOpen(false);
      return;
    }

    setPage((state) => state + 1);
    setPercent((state) => state + 100 / numberOfPage);
  };

  const displayFormStep = () => {
    switch (page) {
      case 1: {
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
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold" htmlFor="type-input">
                Tipo de Serviço
              </label>
              <Input id="type-input" size="lg" {...form.register("type")} />
            </div>
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="description-input">
                Descrição do serviço
              </label>
              <Input
                id="description-input"
                size="lg"
                {...form.register("description")}
              />
            </div>
          </div>
        );
      }
      case 2: {
        return (
          <div className="space-y-2">
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="material-value-input">
                Valor do Material
              </label>
              <Input
                id="material-value-input"
                size="lg"
                {...form.register("material_value")}
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold" htmlFor="labor-value-input">
                Valor da mão de obra
              </label>
              <Input
                id="labor-value-input"
                size="lg"
                {...form.register("labor_value")}
              />
            </div>
          </div>
        );
      }
    }
  };

  return (
    <>
      <Button onPress={onOpen} className="bg-green-400 text-white">
        <Plus />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-2">
                <Progress value={percent} maxValue={100} />
                Criar Orderm de Serviço
              </ModalHeader>
              <ModalBody>
                <form id="create-company-form">{displayFormStep()}</form>
              </ModalBody>
              <ModalFooter>
                <Button
                  form="create-company-form"
                  color="primary"
                  onPress={() => alterPage()}
                >
                  {page === numberOfPage ? "Cadastrar" : "Proximo"}
                  <ChevronRight />
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
