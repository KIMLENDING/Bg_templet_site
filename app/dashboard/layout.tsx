import SideNav from "@/components/sideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden ">
            <div className="w-full flex-none md:w-64">
                <SideNav />
            </div>
            <div className=" flex-grow p-6 md:overflow-y-auto md:p-12 bg-gradient-to-t to-[rgb(80,80,80)] from-[rgb(16,16,16)]">{children}</div>
        </div>
    );
}