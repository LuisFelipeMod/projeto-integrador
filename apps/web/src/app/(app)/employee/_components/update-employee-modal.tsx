import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  DateInput,
} from "@nextui-org/react";
import { CalendarDate, parseDate } from "@internationalized/date";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useCompanyStore } from "@/stores/company-store";


interface UpdateEmployeeModalProps {
  id: string;
  content: Record<string, any>; 
}

export default function UpdateEmployeeModal({
  id,
  content = {},
}: UpdateEmployeeModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const queryClient = useQueryClient();

  const labels = ["Cargo", "Data de Admissão", "Data da Demissão"];

  const [formValues, setFormValues] = useState(content);

  const handleChange = (prop: string, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [prop]: value,
    }));
  };
  

  const mutation = useMutation(
    async (updatedValues: any) => {
      const payload = {
        ...updatedValues,
        startDate: updatedValues.startDate
          ? new Date(updatedValues.startDate).toISOString()
          : null,
        endDate: updatedValues.endDate
          ? new Date(updatedValues.endDate).toISOString()
          : null,
      };

      if (!id) throw new Error("Funcionário não encontrado.");
      return await axios.patch(`http://localhost:4000/employee/${id}`, payload);
    },
    {
      onSuccess: () => {
        toast.success("Funcionário editado com sucesso!");

        queryClient.invalidateQueries("employees");
      },
      onError: (error: any) => {
        console.error("Erro ao editar funcionário:", error);
        toast.error(
          error.response?.data?.message || "Erro ao editar funcionário."
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
                Editar Funcionário
              </ModalHeader>
              <ModalBody>
                {Object.keys(content).map((key, keyIndex) =>
                  key !== "startDate" && key !== "endDate" ? (
                    key === "position" ? (
                      <Input
                        autoFocus
                        key={keyIndex}
                        label={labels[keyIndex - 1]}
                        value={formValues[key] || ""}
                        onChange={(e) => handleChange(key, e.target.value)}
                        variant="bordered"
                      />
                    ) : null
                  ) : (
                    <DateInput
                      key={keyIndex}
                      label={labels[keyIndex - 1]}
                      defaultValue={
                        formValues[key]
                          ? parseDate(
                              new Date(formValues[key])
                                .toISOString()
                                .split("T")[0]
                            )
                          : null
                      }
                      onChange={(date) => handleChange(key, date.toString())}
                    />
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
