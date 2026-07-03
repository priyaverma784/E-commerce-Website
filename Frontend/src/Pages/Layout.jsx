import Navbar from "../components/navbar.jsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col">  
            {/* Navbar always visible */}
            <Navbar />
            {/* Page Content */}
            <main className="flex-1 p-6 bg-[#020B2A]">
                <Outlet />
            </main>

        </div>
    );
}