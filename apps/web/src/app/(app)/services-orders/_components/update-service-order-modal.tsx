import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

interface UpdateServiceOrderModalProps {
  id: string;
  content: any; 
}

export default function UpdateServiceOrderModal({
  id,
  content,
}: UpdateServiceOrderModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const queryClient = useQueryClient();

  const labels = [
    "CPF/CNPJ",
    "Tipo de Serviço",
    "Descrição",
    "Valor do Material",
    "Valor da Mão de Obra",
    "Status",
  ];

  const [formValues, setFormValues] = useState(
    content.reduce((acc: any, field: any) => ({ ...acc, ...field }), {})
  );

  const handleChange = (prop: string, value: string) => {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [prop]: value,
    }));
  };

  const mutation = useMutation(
    async (updatedValues: any) => {
      if (!id) throw new Error("Ordem não encontrada.");
      await axios.patch(`http://localhost:4000/service-order/${id}`, updatedValues);
    },
    {
      onSuccess: () => {
        toast.success("Ordem de serviço editada com sucesso!");

        queryClient.invalidateQueries("serviceOrders");
      },
      onError: (error: any) => {
        console.error("Erro ao editar ordem de serviço:", error);
        toast.error(
          error.response?.data?.message || "Erro ao editar ordem de serviço."
        );
      },
    }
  );

  const handleEdit = () => {
    mutation.mutate(formValues);
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-transparent px-0 mx-0 w-10 min-w-0"
      >
        <div className="flex p-1 rounded-full bg-blue-500 shadow-blue-500 shadow-md cursor-pointer">
          <Pencil className="w-7 h-7" stroke="white" />
        </div>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Editar Ordem de Serviço
              </ModalHeader>
              <ModalBody>
                {content.map((item: any) =>
                  Object.keys(item).map((key, keyIndex) =>
                    key !== "id" ? (
                      <Input
                        autoFocus={keyIndex === 0}
                        key={keyIndex}
                        label={labels[keyIndex]}
                        value={formValues[key] || ""}
                        onChange={(e) => handleChange(key, e.target.value)}
                        variant="bordered"
                      />
                    ) : null
                  )
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Fechar
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handleEdit();
                    onClose();
                  }}
                  isLoading={mutation.isLoading}
                >
                  Editar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
