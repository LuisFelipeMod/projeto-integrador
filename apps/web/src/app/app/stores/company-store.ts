import { create } from "zustand";
import { Company } from "../_components/select-company/select-company-modal";

export interface CompanyStore {
  selectedCompany: Company | null;
  setSelectedCompany: (company: Company) => void;
}

export const useCompanyStore = create<CompanyStore>((set) => ({
  selectedCompany: null,
  setSelectedCompany: (company: Company) => {
    set({ selectedCompany: company });
    localStorage.setItem("company", JSON.stringify(company));
  },
}));

const hydration = async () => {
  const localStoreCompany = localStorage.getItem("company");

  if (localStoreCompany) {
    const company = JSON.parse(localStoreCompany);
    useCompanyStore.setState({ selectedCompany: company });
  }
};

hydration();
