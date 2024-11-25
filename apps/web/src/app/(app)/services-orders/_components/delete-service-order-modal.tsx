import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "react-query";

interface DeleteServiceOrderModalProps {
  id: string;
}

export default function DeleteServiceOrderModal({ id }: DeleteServiceOrderModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      if (!id) throw new Error("Ordem não encontrada.");
      await axios.delete(`http://localhost:4000/service-order/${id}`);
    },
    {
      onSuccess: () => {
        toast.success("Ordem de serviço deletada com sucesso!");

        queryClient.invalidateQueries("serviceOrders");
      },
      onError: (error: any) => {
        console.error("Erro ao deletar ordem de serviço:", error);
        toast.error(
          error.response?.data?.message || "Erro ao deletar ordem de serviço."
        );
      },
    }
  );

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <>
      <Button onPress={onOpen} className="bg-transparent px-0 mx-0 w-10 min-w-0">
        <div className="flex p-1 rounded-full bg-red-500 shadow-red-500 shadow-md cursor-pointer">
          <Trash2 className="w-7 h-7" stroke="white" />
        </div>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Excluir Ordem de Serviço
              </ModalHeader>
              <ModalBody>
                <p>Você tem certeza? (Essa ação não poderá ser desfeita)</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Fechar
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    handleDelete();
                    onClose();
                  }}
                  isLoading={mutation.isLoading}
                >
                  Excluir
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
