import SideNav from "@/components/sideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideNav />
            </div>
            <div className=" flex-grow p-6 md:overflow-y-auto md:p-12 bg-gradient-to-b from-background-start-rgb to-backgroundround-end-rgb ">{children}</div>
        </div>
    );
}