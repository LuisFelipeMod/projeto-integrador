export class CreateServiceOrderDto {
    client_cpf_cnpj: string;
    type: string;
    description: string;
    material_value: number;
    labor_value: number;
    client_name: string;
    client_email: string;
    initial_date: Date;
    estimated_date: Date;
}
