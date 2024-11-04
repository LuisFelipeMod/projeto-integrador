import CreateServiceOrderForm from "./_components/create-service-order-form";
import CreateServiceOrderModal from "./_components/create-service-order-modal";
import CreateServiceOrderQuote from "./_components/create-service-order-quote";

export default function CreateServicesOrders() {
  const serviceOrder = {
    value: 10
  };

  return (
    <div className="h-screen w-full flex justify-center">
      {/* <CreateServiceOrderForm /> */}
      <CreateServiceOrderModal />
      <CreateServiceOrderQuote value={10} />
    </div>
  );
}
