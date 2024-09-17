"use client"

import Logo from "@/assets/logo";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";

export default function SharedServiceOrderPage({ params }: { params: { id: string } }) {
    const [serviceOrder, setServiceOrder] = useState()

    const fetchServiceOrder = useCallback(async () => {
        const response = await fetch(`/api/service-order/${params.id}`, {
            method: "GET",
        });

        const sharedUser = await response.json()

        setServiceOrder(sharedUser)
    }, [params.id]);

    useEffect(() => {
        fetchServiceOrder();
    }, [fetchServiceOrder])

    return (
        <main className="flex flex-col space-y-5">
            <header className="w-screen h-16 bg-dark-300 flex items-center p-5">
                <a href="/">
                    <Logo />
                </a>
            </header>

            <section className="px-10 space-y-4">
                <div className="flex flex-col items-center justify-center gap-10">

                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">Ordem de serviço</h1>
                    </div>

                    <Card className="w-1/3 p-2">
                        <CardHeader>
                            <div className="w-full flex flex-col gap-4">
                                <div className="flex justify-between">
                                    <div className="flex flex-col gap-2">
                                        <h1 className="font-bold">Pedido {serviceOrder?.id}</h1>
                                        <span>{serviceOrder?.client_cpf_cnpj}</span>
                                    </div>
                                    <Chip className="text-zinc-50" color="success">Em Progresso</Chip>
                                </div>
                                <div className="h-[2px] w-full bg-zinc-100 rounded-md" />
                            </div>
                        </CardHeader>
                        <CardBody>
                            <div className="px-5 space-y-2">
                                <div className="flex flex-col gap-2 items-end">
                                    <div className="space-x-2">
                                        <label htmlFor="">Mão de obra: </label>
                                        <span>{serviceOrder?.labor_value}</span>
                                    </div>

                                    <div className="space-x-2">
                                        <label htmlFor="">Valor do material: </label>
                                        <span>{serviceOrder?.material_value}</span>
                                    </div>
                                </div>

                                <div className="">
                                    <div className="h-[2px] w-full bg-zinc-200 rounded-md" />

                                    <div className="w-full flex justify-end">
                                        <div className="space-x-2">
                                            <label htmlFor="">Valor Total: </label>
                                            <span>{serviceOrder?.labor_value + serviceOrder?.material_value}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>

            </section>
        </main>
    )
}
