# OSCEL

## Visão Geral

Projeto feito para facilitar o gerenciamento de prestadores de serviço, gerando contratos das guias, calculo de custo e gerenciamento de funcionários.

## Documentação

A documentação completa do projeto está disponível em formato PDF no repositório. (feita pelo [Leonardo Fajoli](lhttps://github.com/LFormigon))

[📄 Acesse a Documentação](./docs/oscel.pdf)

## Tecnologias Utilizadas

- **Linguagem de Programação:** TypeScript
- **Frameworks e Bibliotecas:** Next.js, NestJS, NextUI
- **Banco de Dados:** SQLite
- **Ferramentas de Desenvolvimento:** Turborepo

## Arquitetura do Projeto

O projeto possui um **frontend** e um **backend**, ambos organizados dentro de um **monorepo** para facilitar o gerenciamento e a integração entre os serviços.
O Frontend utiliza os padrões estabelecidos pela Vercel para o framework NextJS na sua verão 14.
O Backend construído com NestJS conta com uma arquitetura monólito, porem usando pattern de construção de software orientado a objetos, como inversão de dependência, Decorators, Builder e Singletons.

- [Singleton](./apps/api/src/shared/services/prisma/prisma.service.ts)
- [Builder](./apps/api/src/shared/services/mail.service.ts)
- [Decorators](./apps/api/src/decorators/is-public.decorator.ts)

## Desenvolvendo

Para fazer o desenvolvimento, basta utilizar a versão **20** ou posterior do Nodejs, e rodar os seguinte comandos:

```bash
npm install
```

```bash
npm run dev
```

Apenas com esses 2 comandos, o Turborepo ja ira rodar possíveis atualizações no banco de dados, subir o servidor do backend e frontend.

## Funcionalidades

- Geração de contrato
- Dashboard
- Gestão de funcionários

## Contribuidores

Agradecimentos especiais aos contribuidores que ajudaram no desenvolvimento deste projeto:

- [Victor Nathan](https://github.com/VictorNAGomes)
- [Marcelo Magalhães](https://github.com/Marcelo-maga)
- [Leonardo Fajoli](https://github.com/LFormigon)
- [Luis Modesto](https://github.com/LuisFelipeMod)