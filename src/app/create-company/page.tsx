
import CompanyAside from "./_components/company-aside";
import CompanyForm from "./_components/company-form";

export default function CreateCompany() {
  return (
    <div className="h-screen flex justify-center"> 
        <CompanyAside/>
        <CompanyForm/>
    </div>
  );
}
