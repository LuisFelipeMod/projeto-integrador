"use client"

import { Avatar, Button, Listbox, ListboxItem } from "@nextui-org/react";
import { AreaChart, LogOut, PencilRuler, Users } from 'lucide-react';
import { Tooltip } from "@nextui-org/react";
import { Settings } from 'lucide-react';
import ProfileModal from "./profile-modal";
import Logo from "@/assets/logo";

export default function Sidebar() {
    return (
        <aside className="h-screen w-80 bg-dark-300 flex flex-col justify-between">
            <div>
                <div className="p-4 space-y-4">
                    <Logo />
                    <div className="h-[2px] bg-dark-100 rounded-md" />
                </div>

                <div className="px-2 space-y-2">
                    <Button className="bg-dark-300 text-light-100 w-full flex justify-start" startContent={<AreaChart />}>
                        Dashboard
                    </Button>
                    <Button className="bg-dark-300 text-light-100 w-full flex justify-start" startContent={<PencilRuler />}>
                        Ordem de serviço
                    </Button>
                    <Button className="bg-dark-300 text-light-100 w-full flex justify-start" startContent={<Users />}>
                        Usuários
                    </Button>
                </div>
            </div>

            <div className="border-t border-t-dark-100 flex gap-2 p-2 justify-between text-light-200 items-center">
                <ProfileModal />
                <div>
                    <Tooltip content="Configuração">
                        <Button isIconOnly className="bg-dark-300 text-light-100">
                            <Settings />
                        </Button>
                    </Tooltip>
                    <Tooltip content="Sair da plataforma">
                        <Button isIconOnly className="bg-dark-300 text-light-100">
                            <LogOut />
                        </Button>
                    </Tooltip>
                </div>
            </div>
        </aside>
    )
}