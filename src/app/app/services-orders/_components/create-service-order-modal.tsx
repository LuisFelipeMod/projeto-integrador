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
import { register } from "module";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export default function InviteEmployee() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [page, setPage] = useState(1);

  const [percent, setPercent] = useState(0);

  const numberOfPage = 2;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const alterPage = async () => {
    if (page === numberOfPage) {
      form.handleSubmit(async (data) => {
        const body = {
          ownerId: user!.id,
          ...data,
        };

        // await fetch("/api/company", {
        //   method: "POST",
        //   body: JSON.stringify(body),
        // });
      })();

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
              <label className="font-semibold" htmlFor="cnpj-cpf-input">
                CPF / CNPJ do Cliente
              </label>
              <Input
                id="cnpj-cpf-input"
                size="lg"
                {...form.register("cnpj_cpf")}
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold" htmlFor="razao-social-input">
                Tipo de Serviço
              </label>
              <Input id="razao-social-input" size="lg" />
            </div>
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="nome-fantasia-input">
                Descrição do serviço
              </label>
              <Input id="nome-fantasia-input" size="lg" />
            </div>
          </div>
        );
      }
      case 2: {
        return (
          <div className="space-y-2">
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="cnpj-cpf-input">
                Valor do Material
              </label>
              <Input
                id="cnpj-cpf-input"
                size="lg"
                {...form.register("cnpj_cpf")}
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold" htmlFor="razao-social-input">
                Valor da mão de obra
              </label>
              <Input id="razao-social-input" size="lg" />
            </div>
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="nome-fantasia-input">
                Valor total do serviço
              </label>
              <Input id="nome-fantasia-input" size="lg" />
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
                  onPress={alterPage}
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
