"use client"

import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useState } from 'react';
import paperClip from '../../../../public/paperclip.svg'


const itens = [
  ["name", "Nome da Empresa", "Ex.: Oscel Assistência Técnica"],
  ["number", "CNPJ", "Vazio se for profissional autônomo"],
  ["file", "Selecione a imagem de perfil", ""],
];

console.log(paperClip)

export default function CompanyForm() {
  const [file, setFile] = useState(null);


  interface FileHandle{
    target: { files:any }
  }

  const handleFileChange = (event:FileHandle) => {
    const selectedFile = event.target.files[0];

    setFile(selectedFile.name);
  };

  return (
    <section className="w-7/12 px-16 flex flex-col items-center" style={{padding: "8.188rem 7rem"}}>
      <h2 className="text-dark-300 text-2xl pt-5 font-bold text-center mb-8">Dados da empresa</h2>
      {itens.map((item, key) => {
        const type = item[0];
        const label = item[1];
        const placeholder = item[2];
        const isUpload = type == "file";

        if (!isUpload) {
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
        }

        return (
          <div className="pt-5 pb-5 w-5/12 flex justify-center" key={key}>
            <Button color="default" variant="solid">
              <img src={paperClip.src} alt="" />
              <label htmlFor="file">{ file ? file : label}</label>
              <input
                id="file"
                className="w-full"
                style={{ visibility: "hidden" }}
                type={type}
                onChange={handleFileChange}
              />
            </Button>
          </div>
        );
      })}
      
      <div className="pt-5 pb-5 w-5/12 flex justify-center">
        <Button fullWidth={true} color="default" variant="solid">Cadastrar</Button>
      </div>
    </section>
  );
}
