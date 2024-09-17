import CreateServiceOrderForm from "./_components/create-service-order-form";
import CreateServiceOrderModal from "./_components/create-service-order-modal";

export default function CreateServicesOrders() {
  return (
    <div className="h-screen w-full flex justify-center">
      {/* <CreateServiceOrderForm /> */}
      <CreateServiceOrderModal />
    </div>
  );
}
