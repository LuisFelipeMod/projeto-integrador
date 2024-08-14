"use client";

import { Plus, Clipboard, Send } from "lucide-react";
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
  Divider,
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onClick = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/auth-employee?company=teste123`
    );
    toast.success("Link copiado para à área de transferência.");
  };

  return (
    <>
      <Button onPress={onOpen} className="bg-green-400 text-white">
        <Plus />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <ModalContent className="pt-3 pb-10">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Convidar Funcionário
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-y-2">
                  <div className="flex gap-2">
                    <Input
                      isReadOnly
                      defaultValue={`${window.location.origin}/auth-employee?company=teste123`}
                      label="Copiar Link de convite"
                      labelPlacement="outside"
                    />
                    <Button
                      onPress={onClick}
                      className="bg-blue-400 text-white self-end"
                    >
                      <Clipboard />
                    </Button>
                  </div>
                  <div className="grid grid-cols-[5fr_1fr_5fr] items-center">
                    <Divider className="bg-zinc-400" />
                    <h2 className="text-center text-xs text-zinc-400 font-bold">
                      ou
                    </h2>
                    <Divider className="bg-zinc-400" />
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="E-mail do Funcionário"
                      label="E-mail"
                      labelPlacement="outside"
                    />
                    <Button
                      onPress={onClick}
                      className="bg-green-400 text-white self-end"
                    >
                      <Send />
                    </Button>
                  </div>
                </div>
              </ModalBody>
              {/* <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
