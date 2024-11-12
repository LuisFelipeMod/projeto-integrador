import CreateServiceOrderForm from "./_components/create-service-order-form";
import CreateServiceOrderModal from "./_components/create-service-order-modal";
import CreateServiceOrderQuote from "./_components/create-service-order-quote";

export default function CreateServicesOrders() {
  const serviceOrder = {
    value: 10
  };

  const serviceOrderQuote  = {
    clientName: 'Teste Nome',
    cpfCnpj: '111.111.111-11',
    email: 'teste@gmail.com',
    labor_value: 1000,
    material_value: 40,
    whole_value: 1040,
}

  return (
    <div className="h-screen w-full flex justify-center">
      {/* <CreateServiceOrderForm /> */}
      <CreateServiceOrderModal />
      <CreateServiceOrderQuote ServiceOrderQuote={serviceOrderQuote} />
    </div>
  );
}
