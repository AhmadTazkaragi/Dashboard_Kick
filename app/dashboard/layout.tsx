"use client";
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#E7E7E3]">
      {/* تمرير الحالة للتحكم في فتح المنيو من الجوال */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* زر المنيو موجود داخل الهيدر لتسهيل الوصول */}
        <Header onOpenMenu={() => setMobileOpen(true)} />
        
        <main className="flex-1 p-4 lg:p-4 overflow-y-auto">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}