import Image from 'next/image'

export default function CompanyAside(){
    return(
        <aside className="h-full bg-gradient-to-r from-blue-950 to-blue-900 flex flex-col items-center w-5/12" style={{padding: '8.188rem 7rem'}}>
            <h2 className="text-slate-100 text-5xl font-bold text-center mb-8">Cadastrar empresa</h2>
            <p className="px-14 text-slate-100 text-base text-center mb-8">Bem vindo ao momento de criar a sua conta. Aqui, você dá início à sua jornada na geração de ordens de serviço que o Oscel pode te proporcionar</p>
            <Image src="/person.png" width={420} height={394} alt="Imagem ilustrativa de uma pessoa"/>
        </aside>
    )
}