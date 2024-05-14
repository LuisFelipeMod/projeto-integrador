"use client";

import { Input, Button } from "@nextui-org/react";
import { Paperclip } from "lucide-react";

const itens = [
  ["name", "Nome da Empresa", "Ex.: Oscel Assistência Técnica"],
  ["number", "CNPJ", "Vazio se for profissional autônomo"],
];

export default function createServiceOrderForm() {
  return (
    <section
      className="w-10/12 px-16 flex flex-col items-center"
      style={{ padding: "8.188rem 7rem" }}
    >
      <h2 className="text-dark-300 text-2xl pt-5 font-bold text-center mb-8">
        Dados da empresa
      </h2>
      {itens.map((item, key) => {
        const type = item[0];
        const label = item[1];
        const placeholder = item[2];
        return (
          <div className="pt-5 pb-5 w-5/12" key={key}>
            <Input
              type={type}
              variant="bordered"
              label={label}
              placeholder={placeholder}
            />
          </div>
        );
      })}

      <div className="pt-5 pb-5 w-5/12 flex justify-center">
        <Button fullWidth={true} color="default" variant="solid">
          Cadastrar
        </Button>
      </div>
    </section>
  );
}
