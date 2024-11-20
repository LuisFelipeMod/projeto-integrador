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

export default function DeleteEmployeeModal(props: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const route = useRouter()

  async function deleteOrder() {
    const id = props.id;

    if (!id) toast.error("Ordem não encontrada.");

    try {
      await axios.delete(`http://localhost:4000/employee/${id}`);
      toast.success("Funcionário deletado com sucesso!");
      route.push("/services-orders")
    } catch (error) {
      console.error("Erro ao editar funcionário:", error);
      toast.error("Erro ao deletar funcionário");
    }
  }

  return (
    <>
      <Button onPress={onOpen} className="bg-transparent px-0 mx-0 w-10 min-w-0">
        <div className="flex p-1 rounded-full bg-red-500  shadow-red-500  shadow-md cursor-pointer">
          <Trash2 className="w-7 h-7" stroke="white" />
        </div>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Excluir funcionário
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
