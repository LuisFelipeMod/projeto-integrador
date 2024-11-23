import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import axios from "axios";
import { Mail, Lock, Printer, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function App(props: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const fields = props.content;

  const labels = [
    "CPF/CNPJ",
    "Tipo de Serviço",
    "Descrição",
    "Valor do Material",
    "Valor da Mão de Obra",
    "Status",
  ];

  const [formValues, setFormValues] = useState(
    fields.reduce((acc: any, field: any) => ({ ...acc, ...field }), {})
  );

  const handleChange = (prop: string, value: string) => {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [prop]: value,
    }));
  };

  async function putOrder() {
    const id = props.id;

    if (!id) toast.error("Ordem não encontrada.");

    try {
      await axios.patch(`http://localhost:4000/service-order/${id}`, formValues);
      toast.success("Ordem de serviço editada com sucesso!");
    } catch (error) {
      console.error("Erro ao editar ordem de serviço:", error);
      toast.error("Erro ao editar ordem de serviço");
    }
  }

  async function deleteOrder() {
    const id = props.id;

    if (!id) toast.error("Ordem não encontrada.");

    try {
      await axios.delete(`http://localhost:4000/service-order/${id}`);
      toast.success("Ordem de serviço deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao editar ordem de serviço:", error);
      toast.error("Erro ao deletar ordem de serviço");
    }
  }

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-transparent px-0 mx-0 w-10 min-w-0"
      >
        <div className="flex p-1 rounded-full bg-blue-500 shadow-blue-500  shadow-md cursor-pointer">
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
                {fields.map((item: any) =>
                  Object.keys(item).map((key, keyIndex) =>
                    key !== "id" ? (
                      <Input
                        autoFocus
                        key={keyIndex - 1}
                        label={labels[keyIndex - 1]}
                        value={formValues[key]}
                        onChange={(e) => handleChange(key, e.target.value)}
                        variant="bordered"
                      />
                    ) : (
                      <></>
                    )
                  )
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Fechar
                </Button>
                <Button color="primary" onPress={putOrder}>
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
