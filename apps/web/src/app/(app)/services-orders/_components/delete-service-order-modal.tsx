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
import { useRouter } from 'next/navigation'
import { toast } from "sonner";

export default function DeleteServiceOrderModal(props: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const route = useRouter()

  async function deleteOrder() {
    const id = props.id;

    if (!id) toast.error("Ordem não encontrada.");

    try {
      await axios.delete(`http://localhost:4000/service-order/${id}`);
      toast.success("Ordem de serviço deletada com sucesso!");
      route.push("/services-orders")
    } catch (error) {
      console.error("Erro ao editar ordem de serviço:", error);
      toast.error("Erro ao deletar ordem de serviço");
    }
  }

  return (
    <>
      <Button onPress={onOpen}>
        <div className="flex p-1 rounded-full bg-red-500  shadow-red-500  shadow-md cursor-pointer">
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
                <Button color="danger" onPress={deleteOrder}>
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
