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
  DateInput,
  Link,
} from "@nextui-org/react";
import { CalendarDate, parseDate } from "@internationalized/date";
import axios from "axios";
import { Mail, Lock, Printer, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function App(props: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const fields = props.content;

  const labels = ["Cargo", "Data de Admissão", "Data da Demissão"];

  const [formValues, setFormValues] = useState(
    fields.reduce((acc: any, field: any) => ({ ...acc, ...field }), {})
  );

  const handleChange = (prop: string, value: string) => {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [prop]: value,
    }));

  };

  async function patchEmployee() {
    const id = props.id;
    
    const updatedValues = {
      ...formValues,
      startDate: formValues.startDate ? new Date(formValues.startDate).toISOString() : null,
      endDate: formValues.endDate ? new Date(formValues.endDate).toISOString() : null,
    };
    
    if (!id) toast.error("Usuário não encontrado.");


    try {
      await axios.patch(`http://localhost:4000/employee/${id}`, updatedValues);
      toast.success("Usuário editado com sucesso!");
    } catch (error) {
      console.error("Erro ao editar usuário:", error);
      toast.error("Erro ao editar usuário");
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
                Editar Funcionário
              </ModalHeader>
              <ModalBody>
                {fields.map((item: any) =>
                  Object.keys(item).map((key, keyIndex) =>
                    key !== "startDate" && key !== "endDate" ? (
                      key == "position" ? (
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
                    ) : (
                      <DateInput
                        label={labels[keyIndex - 1]}
                        defaultValue={parseDate(
                          new Date(formValues[key]).toISOString().split("T")[0]
                        )}
                        placeholderValue={new CalendarDate(1995, 11, 6)}
                        onChange={(date) => handleChange(key, date.toString())}
                      />
                    )
                  )
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Fechar
                </Button>
                <Button color="primary" onPress={patchEmployee}>
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
