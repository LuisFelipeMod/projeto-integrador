import { create } from "zustand";
import type { Company } from "@/@types/company";

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
