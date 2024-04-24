"use client";

import { Plus } from "lucide-react";
import { Button } from "@nextui-org/react";
import { toast } from "sonner";

export default function InviteEmployee() {
  const onClick = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/auth-employee?company=teste123`
    );
    toast.success("Link copiado para à área de transferência.");
  };

  return (
    <Button isIconOnly className="bg-green-400 text-white" onClick={onClick}>
      <Plus />
    </Button>
  );
}
