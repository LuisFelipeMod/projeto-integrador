"use client"

import { Button } from "@nextui-org/react";

type ServiceOrderQuoteType  = {
    value: number
}

export default function CreateServiceOrderQuote(serviceOrder: ServiceOrderQuoteType) {

    const generateQuote = async () => {
        try {
            const result = await fetch("/api/quote", {
                method: 'POST'
            }).then( r => r.json())

            document.getElementById("download")?.click();
        } catch (err) {
            console.log("ERROR: " + err)
        }   
    }

  return (
    <>      
    <Button onPress={generateQuote} className="bg-green-400 text-white">
        teste
    </Button>
        <a href="/result.pdf" download id="download" hidden>download</a>
    </> 
  );
}