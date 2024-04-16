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
import ProfileModal from "./profile-modal";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/cn";

export default function Sidebar() {
  return (
    <aside className="h-screen w-80 bg-dark-300 flex flex-col justify-between">
      <div>
        <div className="p-4 space-y-4">
          <Logo />
          <div className="h-[2px] bg-dark-100 rounded-md" />
        </div>

        <div className="px-2 space-y-2">
          <SidebarItem label="Home" icon={Home} path="" />
          <SidebarItem label="Dashboard" icon={AreaChart} path="dashboard" />
          <SidebarItem
            label="Ordem de serviço"
            icon={PencilRuler}
            path="services-orders"
          />
          <SidebarItem label="Usuários" icon={Users} path="users" />
          <SidebarItem label="Funcionários" icon={Users} path="employee" />
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
      onClick={() => router.push(`app/${path}`)}
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
