"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import Spinner from "@/components/spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Informe um email válido"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function AuthForm() {
  const searchParams = useSearchParams();
  const search = searchParams.get("company");
  //Buscar empresa
  const company = "Teste";

  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setLoading(true);
    try {
      await signIn("email", {
        email: data.email,
        redirect: false,
        calbackurl: "/app/teste",
      });
      toast.success("Link de acesso enviado ao seu email!");
    } catch (error) {
      toast.success("Link de acesso enviado ao seu email!");
    }
    setLoading(false);
  });

  const emailInputError = form.formState.errors.email;

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">
          Você foi convidado para participar da empresa {company}
        </h1>
        <span className="text-sm text-zinc-500">
          Informe seu email para prosseguir
        </span>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="email-auth-input">Email</label>
          <Input
            id="email-auth-input"
            isInvalid={emailInputError ? true : false}
            errorMessage={emailInputError?.message}
            size="lg"
            placeholder="comercial@festassimples.com"
            {...form.register("email")}
          />
        </div>
        <Button
          spinner={<Spinner />}
          isLoading={isLoading}
          type="submit"
          size="lg"
          color="primary"
          fullWidth
          className="font-bold"
        >
          Enviar Link
        </Button>
      </form>
    </section>
  );
}
