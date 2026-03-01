"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";

import {
    LayoutDashboard,
    Users,
    Calendar,
    Settings,
    Home,
    ShoppingBag,
   


} from "lucide-react";
import Image from "next/image";
import logo from "../app/assets/images/logo.png"
import { Button } from "./ui/button";
import Link from "next/link";
export function AppSidebar() {
    return (
        <Sidebar className="border-r bg-white dark:bg-gray-900 dark:border-gray-800">
            {/* ===== Header ===== */}
            <SidebarHeader className="p-6 border-b dark:border-gray-800">
                <div className="flext justify-center items-center text-xl font-bold   ">
                    <Link className="text-xl font-semibold text-[#2563eb]" href={"/home"}>
                        <Image src={logo} alt="Logo" className="h-5 w-auto " />
                    </Link>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Admin Panel
                </p>
            </SidebarHeader>

            {/* ===== Content ===== */}
            <SidebarContent className="px-3 py-4">
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-pink-400">
                                <LayoutDashboard className="h-5 w-5" />
                                <Link href={"/dashboard"}>Dashboard</Link>

                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-pink-400">
                                <ShoppingBag className="h-5 w-5" />
                                <Link href={"/all-products"}>All Products</Link>

                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-pink-400">
                                <Home className="h-5 w-5" />
                                <Link href={"/home"}>Home</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-pink-400">
                                <Settings className="h-5 w-5" />
                                Settings
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            {/* ===== Footer ===== */}
            <SidebarFooter className="p-4 border-t dark:border-gray-800">
                <Link href="/">
                    <Button className="bg-red-600 text-white hover:bg-red-600 hover:text-white w-full">Logout</Button>

                </Link>
            </SidebarFooter>
        </Sidebar>
    );
}