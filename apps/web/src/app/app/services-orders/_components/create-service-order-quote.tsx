"use client"

import { Button } from "@nextui-org/react";

export type ServiceOrderQuoteType  = {
    clientName: string,
    cpfCnpj: string,
    email: string,
    labor_value: number,
    material_value: number,
    whole_value: number,
}

type ServiceOrderQuoteComponentType = {
    ServiceOrderQuote: ServiceOrderQuoteType
}

export default function CreateServiceOrderQuote(serviceOrder: ServiceOrderQuoteComponentType) {

    const generateQuote = async () => {
        try {
            const fileName = Date.now().toString(36) + Math.random().toString(36).substring(2) + ".pdf"
            await fetch("/api/quote", {
                method: 'POST',
                body: JSON.stringify({
                    fileName: fileName,
                    serviceOrder: serviceOrder.ServiceOrderQuote
                })
            }).then( r => r.json())

            document.getElementById("download")!.setAttribute("href","/"+fileName);
            await document.getElementById("download")?.click();

            await fetch("/api/quote", {
                method: 'DELETE',
                body: JSON.stringify({
                    fileName: fileName
                })
            }).then( r => r.json())

        } catch (err) {
            console.log("ERROR: " + err)
        }   
    }

  return (
    <>      
    <Button onPress={generateQuote} className="bg-green-400 text-white">
        teste
    </Button>
        <a download id="download" hidden>download</a>
    </> 
  );
}