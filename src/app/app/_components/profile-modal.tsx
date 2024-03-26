"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Avatar,
} from "@nextui-org/react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

export default function ProfileModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
              <ModalHeader className="flex flex-col gap-1">
                Editar
              </ModalHeader>
              <ModalBody>
                <Tabs aria-label="Options">
                  <Tab key="photos" title="Perfil">
                    <Card>
                      <CardBody>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
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
