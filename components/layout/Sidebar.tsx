"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { LayoutDashboard, Package2, FileText, ChevronDown, X } from "lucide-react";

const links = [
	{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
	{ name: "All Products", href: "/dashboard/all-products", icon: Package2 },
	{ name: "Order List", href: "/dashboard/order-list", icon: FileText },
];

const categories = [
	{ name: "Sneakers", count: 21 },
	{ name: "Runners", count: 32 },
	{ name: "Golf", count: 13 },
	{ name: "Hiking", count: 14 },
	{ name: "Football", count: "06" },
	{ name: "Baseball", count: 11 },
];

export default function Sidebar({ mobileOpen, setMobileOpen }) {
	const pathname = usePathname();
	const [open, setOpen] = useState(true);

	return (
		<>
			{/* Overlay للموبايل فقط لضمان عدم ضغط المحتوى */}
			<div
				className={`fixed inset-0  bg-black/40 backdrop-blur-sm z-[50] font-open-sans lg:hidden transition-opacity duration-300 ${mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
				onClick={() => setMobileOpen(false)}
			/>

			<aside className={`fixed top-0 left-0 z-[60] w-72 bg-[#FAFAFA] border-r border-[#23232133] transform transition-transform duration-300 ease-in-out flex flex-col
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:sticky lg:top-0 lg:translate-x-0 lg:h-screen lg:self-start`}>
				<div className="p-6 pt-8 flex items-center justify-center">
					<Image src="/Group.png" alt="Logo" width={110} height={28} />
				</div>

				<nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
					{links.map((link) => {
						const isActive = pathname === link.href;
						const Icon = link.icon;
						return (
							<Link
								key={link.name}
								href={link.href}
								onClick={() => setMobileOpen(false)}
								className={`flex items-center px-4 py-3 rounded-lg text-sm font-bold transition-all ${isActive ? "bg-[#4A69E2] text-white" : "text-[#232321] hover:bg-gray-100"}`}>
								<Icon className="w-5 h-5 mr-3" /> {link.name.toUpperCase()}
							</Link>
						);
					})}

					<div className="mt-8 border-t border-gray-100 pt-6">
						<button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full px-2 mb-4">
							<span className="text-lg font-bold text-[#232321]">Categories</span>
							<ChevronDown className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} />
						</button>

						<ul className={`space-y-1 overflow-hidden transition-all duration-300 ${open ? "max-h-96" : "max-h-0"}`}>
							{categories.map((cat) => (
								<li key={cat.name}>
									<Link href={`/dashboard/categories/${cat.name.toLowerCase()}`}
										className="flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-[#232321] rounded-lg hover:bg-gray-100 group">
										<span>{cat.name}</span>
										<span className={`px-2 py-1 rounded text-[10px] min-w-[30px] text-center transition-colors ${pathname.includes(cat.name.toLowerCase()) ? "bg-[#4A69E2] text-white" : "bg-[#E7E7E3] text-[#232321]"}`}>
											{cat.count}
										</span>
									</Link>
								</li>
							))}
						</ul>
					</div>
				</nav>
			</aside>
		</>
	);
}