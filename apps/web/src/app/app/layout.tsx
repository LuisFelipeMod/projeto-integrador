"use client"

import CreateCompanyModal from "./_components/create-company-modal";
import Sidebar from "./_components/sibebar";
import { useUserStore } from "@/stores/user-store";

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { _hydrated, user } = useUserStore()

    if (!_hydrated) return false

    return (
        <>
            <main className="grid grid-cols-[320px_1fr]">
                <Sidebar />
                <div className="">
                    {children}
                </div>
            </main>

            <CreateCompanyModal totalCompanyInUser={user!.companies_owner.length} />
        </>
    )
}