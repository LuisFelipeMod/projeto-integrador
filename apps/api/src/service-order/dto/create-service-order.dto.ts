export class CreateServiceOrderDto {
    client_cpf_cnpj: string;
    type: string;
    description: string;
    material_value: number;
    labor_value: number;
}
