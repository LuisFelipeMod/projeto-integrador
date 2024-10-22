"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Progress,
} from "@nextui-org/react";
import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUserStore } from "@/stores/user-store";

interface CreateCompanyModalProps {
    totalCompanyInUser: number
}

const createCompanyFormSchema = z.object({
    cnpj_cpf: z.string(),
    corporate_name: z.string(),
    fantasy_name: z.string().optional()
});

type CreateFormSchema = z.infer<typeof createCompanyFormSchema>

const numberOfPage = 2;

export default function CreateCompanyModal({ totalCompanyInUser }: CreateCompanyModalProps) {
    const { user } = useUserStore();
    const [isOpen, setIsOpen] = useState(false)
    const [page, setPage] = useState(1)
    const [percent, setPercent] = useState(0)

    const form = useForm<CreateFormSchema>({
        resolver: zodResolver(createCompanyFormSchema)
    })

    useEffect(() => {
        if (totalCompanyInUser === 0) setIsOpen(true)
        return () => setIsOpen(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const alterPage = async () => {
        if (page === numberOfPage) {
            form.handleSubmit(async (data) => {
                const body = {
                    ownerId: user!.id,
                    ...data,
                }

                await fetch("/api/company", { method: "POST", body: JSON.stringify(body) })
            })();

            setIsOpen(false)
            return
        }

        setPage(state => state + 1)
        setPercent(state => state + (100 / numberOfPage))
    }

    const displayFormStep = () => {
        switch (page) {
            case 1: {
                return (
                    <div className="space-y-1">
                        <label className="font-semibold" htmlFor="cnpj-cpf-input">CPF / CNPJ</label>
                        <Input
                            id="cnpj-cpf-input"
                            size="lg"
                            {...form.register("cnpj_cpf")}
                        />
                    </div>
                )
            }

            case 2: {
                return (
                    <div className="space-y-2">
                        <div className="space-y-1">
                            <label className="font-semibold" htmlFor="razao-social-input">Razão Social</label>
                            <Input
                                id="razao-social-input"
                                size="lg"
                                {...form.register("corporate_name")}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="font-semibold" htmlFor="nome-fantasia-input">Nome Fantasia</label>
                            <Input
                                id="nome-fantasia-input"
                                size="lg"
                                {...form.register("fantasy_name")}
                            />
                        </div>
                    </div>
                )
            }
        }
    }

    return (
        <Modal isOpen={isOpen} isDismissable={false} hideCloseButton={true} >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-2">
                            <Progress value={percent} maxValue={100} />
                            <div className="flex flex-col">
                                Bem-vindo 🥳
                                <span className="text-sm text-zinc-500">vamos juntos criar sua empresa</span>
                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <form id="create-company-form">
                                {displayFormStep()}
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button form="create-company-form" color="primary" onPress={alterPage}>
                                {page === numberOfPage ? "Finalizar!" : "Proximo"}
                                <ChevronRight />
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}