import Sidebar from "./_components/sibebar";

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex">
            <Sidebar />
            {children}
        </main>
    )
}