
import CompanyAside from "./_components/company-aside";
import CompanyForm from "./_components/company-form";

export default function CreateCompany() {
  return (
    <main className="h-screen flex justify-center"> 
        <CompanyAside/>
        <CompanyForm/>
    </main>
  );
}
