"use client";

import Logo from "@/assets/logo";
import { Button, Tooltip } from "@nextui-org/react";
import {
  AreaChart,
  Home,
  LogOut,
  LucideIcon,
  PencilRuler,
  Settings,
  Users,
} from "lucide-react";
import SelectCompanyModal from "./select-company/select-company-modal";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import SettingsModal from "./settings-modal";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

export default function Sidebar() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const route = useRouter();

  function logout() {

    onClose();
    route.push("/auth");
  }

  return (
    <>
      <aside className="h-screen w-80 bg-dark-300 flex flex-col justify-between">
        <div>
          <div className="p-4 space-y-4">
            <Logo />
            <div className="h-[2px] bg-dark-100 rounded-md" />
          </div>

          <div className="px-2 space-y-2">
            <SidebarItem label="Home" icon={Home} path="" />
            <SidebarItem
              label="Ordem de serviço"
              icon={PencilRuler}
              path="services-orders"
            />
            <SidebarItem label="Funcionários" icon={Users} path="employee" />
          </div>
        </div>

        <div className="border-t border-t-dark-100 flex gap-2 p-2 justify-between text-light-200 items-center">
          <SelectCompanyModal />
          <div>
            <SettingsModal />
            <Tooltip content="Sair da plataforma">
              <Button
                onPress={onOpen}
                isIconOnly
                className="bg-dark-300 text-light-100"
              >
                <LogOut />
              </Button>
            </Tooltip>
          </div>
        </div>
      </aside>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Deseja realmente sair da plataforma?
              </ModalHeader>
              <ModalBody>
                <p className="text-sm">
                  Ao sair, você será desconectado e precisará fazer login
                  novamente para acessar suas informações.
                </p>
                <p className="font-bold">Tem certeza de que deseja continuar?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={logout}>
                  Aceitar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function SidebarItem({
  label,
  icon: Icon,
  path,
}: {
  label: string;
  path: string;
  icon: LucideIcon;
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Button
      onClick={() =>
        router.push(`${pathname.includes("app") ? "" : "app/"}${path}`)
      }
      className={cn(
        "bg-transparent text-light-100 w-full flex justify-start transition-all duration-300 hover:bg-dark-200",
        { "bg-dark-200": pathname.includes(path) }
      )}
      startContent={<Icon />}
    >
      {label}
    </Button>
  );
}
