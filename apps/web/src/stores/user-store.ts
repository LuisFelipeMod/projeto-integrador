import { create } from "zustand";
import { getSession } from "next-auth/react";

interface UserInterface {
  id: string;
  name: string;
  email: string;
  emailVerified: Date;
  image: string;
  companies_owner: any[];
}

export interface UserStore {
  user: UserInterface | null;
  _hydrated: boolean;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  _hydrated: false,
}));

const hydration = async () => {
  const session = await getSession();

  if (session) {
    const getUserQuery = await fetch(`/api/user/${session.user?.email}`, {
      method: "GET",
    });

    const response = await getUserQuery.json();

    const user: UserInterface = {
      ...response,
    };

    useUserStore.setState({ _hydrated: true, user });
  }
};

hydration();
