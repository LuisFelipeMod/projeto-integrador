"use client"

import CreateCompanyModal from "./_components/create-company-modal";
import Sidebar from "./_components/sibebar";
import { useUserStore } from "./stores/user-store";

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { _hydrated, user } = useUserStore()

    if (!_hydrated) return false

    return (
        <>
            <main className="flex">
                <Sidebar />
                {children}
            </main>

            <CreateCompanyModal totalCompanyInUser={user!.companies_owner.length} />
        </>
    )
}