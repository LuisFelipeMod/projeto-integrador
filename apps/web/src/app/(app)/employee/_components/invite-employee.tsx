"use client";

import { useCompanyStore } from "@/stores/company-store";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Snippet,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { Plus, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const inviteEmployeeSchema = z.object({
  email: z.string().email("Informe um email válido"),
});

type InviteEmployeeForm = z.infer<typeof inviteEmployeeSchema>;

export default function InviteEmployee() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { selectedCompany } = useCompanyStore();

  const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL}/invite-employee?company=${selectedCompany?.id}`;

  const form = useForm<InviteEmployeeForm>({
    resolver: zodResolver(inviteEmployeeSchema),
  });

  const onSubmit = async (data: InviteEmployeeForm) => {
    try {
      await axios.post("http://localhost:4000/employee/invite", {
        email: data.email,
        companyId: selectedCompany!.id,
      });

      toast.success("Convite enviado ao novo funcionário");
    } catch {
      toast.error("Erro ao enviar o email para o novo funcionário!");
    } finally {
      form.reset();
      onClose();
    }
  };

  const invalidEmailField = form.formState.errors.email;

  return (
    <>
      <Tooltip content="Convide novos funcionários">
        <Button onPress={onOpen} color="primary">
          <Plus />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <ModalContent className="pt-3 pb-10">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Convidar Funcionário
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-y-3">
                  <Snippet
                    className="w-full"
                    classNames={{
                      base: "overflow-hidden relative",
                      pre: "max-w-full flex-grow whitespace-nowrap overflow-hidden text-ellipsis px-2",
                      copyButton: "absolute top-1 right-1",
                    }}
                    size="lg"
                    symbol=""
                  >
                    {inviteUrl}
                  </Snippet>

                  <div className="grid grid-cols-[5fr_1fr_5fr] items-center">
                    <Divider className="bg-zinc-400" />
                    <h2 className="text-center text-xs text-zinc-400 font-bold">
                      ou
                    </h2>
                    <Divider className="bg-zinc-400" />
                  </div>

                  <form
                    className="flex w-full gap-2"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <Input
                      placeholder="E-mail do Funcionário"
                      {...form.register("email")}
                      isInvalid={invalidEmailField ? true : false}
                      errorMessage={form.formState.errors.email?.message}
                    />
                    <Tooltip content="Mande um email para ele!!">
                      <Button type="submit" color="primary">
                        <Send />
                      </Button>
                    </Tooltip>
                  </form>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
