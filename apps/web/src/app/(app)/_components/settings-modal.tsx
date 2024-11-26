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
    Input,
    Tabs,
    Tab,
    Card,
    CardBody,
    Tooltip,
} from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "module";
import { Settings } from "lucide-react";

const formSchema = z.object({
    name: z.string(),
    email: z.string().email()
})

export default function SettingsModal() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    return (
        <>

            <Tooltip content="Configuração">
                <Button onPress={onOpen} isIconOnly className="bg-dark-300 text-light-100">
                    <Settings />
                </Button>
            </Tooltip>
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
