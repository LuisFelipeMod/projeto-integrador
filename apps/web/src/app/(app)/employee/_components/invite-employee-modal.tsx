"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export default function InviteEmployeeModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-dark-300 flex gap-2 p-0 text-light-100"
      >
        <Avatar src="https://github.com/Marcelo-maga.png" />
        <div>
          <strong>Marquinhos</strong>
          <p className="text-xs">EMPRESA TOP</p>
        </div>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Editar</ModalHeader>
              <ModalBody>
                <Tabs aria-label="Options">
                  <Tab key="profile" title="Perfil">
                    <Card>
                      <CardBody>
                        <form className="space-y-2">
                          <Input
                            {...form.register("name")}
                            type="text"
                            label="Nome"
                          />

                          <Input
                            {...form.register("email")}
                            type="email"
                            label="Email"
                          />
                        </form>
                      </CardBody>
                    </Card>
                  </Tab>
                </Tabs>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={onClose}>
                  Salvar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
