"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button, Divider, Input, Modal, ModalBody, ModalContent,
  ModalHeader, Snippet, Tooltip, useDisclosure
} from "@nextui-org/react";
import { Plus, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const inviteEmployeeSchema = z.object({
  email: z.string().email("Informe um email válido"),
});

type InviteEmployeeForm = z.infer<typeof inviteEmployeeSchema>;

export default function InviteEmployee() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const form = useForm<InviteEmployeeForm>({
    resolver: zodResolver(inviteEmployeeSchema),
  });

  const onSubmit = async (data: InviteEmployeeForm) => {
    console.log(data);

    form.reset();
    onClose();
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
                  <Snippet symbol="">
                    {`${window.location.origin}/auth-employee?company=teste123`}
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
