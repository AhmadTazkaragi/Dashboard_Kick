"use client";
import { useState } from "react";
import { Search, Bell, ChevronDown, Menu, Lock, LogOut, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// eslint-disable-next-line react/prop-types
export default function Header({ onOpenMenu }: { onOpenMenu: () => void }) {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/dashboard/all-products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="h-20 bg-white border-b border-gray-100 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4">
        {/* زر المنيو يظهر فقط في الجوال */}
        <button onClick={onOpenMenu} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Menu size={24} className="text-[#232321]" />
        </button>
      </div>

      <div className="flex items-center gap-2 md:gap-5 ml-auto">
        <div className={`flex items-center transition-all overflow-hidden ${isSearchOpen ? 'bg-gray-100 rounded-full pl-1 pr-3' : ''}`}>
          <button 
            onClick={() => {
              if (isSearchOpen && searchQuery.trim()) {
                router.push(`/dashboard/all-products?search=${encodeURIComponent(searchQuery)}`);
                setIsSearchOpen(false);
              } else {
                setIsSearchOpen(!isSearchOpen);
              }
            }} 
            className="p-2 text-[#232321] hover:bg-gray-100 rounded-full transition-colors"
          >
            <Search className="cursor-pointer" size={22} />
          </button>
          <input 
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className={`bg-transparent border-none outline-none text-sm transition-all duration-300 ${isSearchOpen ? 'w-32 md:w-48 opacity-100' : 'w-0 opacity-0'}`}
          />
        </div>
        
        <div className="relative">
          <button onClick={() => {setIsNotifOpen(!isNotifOpen); setIsAdminOpen(false)}} className="p-2 text-[#232321] relative">
            <Bell className="cursor-pointer hover:bg-gray-100 rounded-full transition-colors" size={22} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#4A69E2] rounded-full border-2 border-white"></span>
          </button>
          
          {isNotifOpen && (
            <div className="absolute top-full right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-200">
               <div className="p-4 flex items-center justify-between border-b bg-gray-50/50">
                  <span className="font-bold">Notifications</span>
                  <button onClick={() => setIsNotifOpen(false)}><X size={16} /></button>
               </div>
               <div className="max-h-80 overflow-y-auto">
                  {[1, 2].map(i => (
                    <div key={i} className="p-4 flex gap-3 hover:bg-gray-50 border-b last:border-0">
                       <div className="w-12 h-12 bg-gray-100 rounded-lg shrink-0" />
                       <div className="flex-1">
                          <div className="flex justify-between"><p className="text-sm font-bold">Adidas Ultra boost</p><span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded font-bold">Sold</span></div>
                          <p className="text-xs text-gray-500">$140</p>
                          <p className="text-[10px] text-gray-400 mt-1">Sep 20, 2022</p>
                       </div>
                    </div>
                  ))}
               </div>
               <div className="p-3 bg-gray-50 flex justify-between gap-2">
                  <button className="text-[10px] font-bold hover:underline">MARK ALL AS READ</button>
                  <button className="text-[10px] bg-[#232321] text-white px-3 py-2 rounded-lg font-bold">VIEW ALL</button>
               </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button 
            onClick={() => {setIsAdminOpen(!isAdminOpen); setIsNotifOpen(false)}}
            className={`flex cursor-pointer items-center gap-2 px-4 py-2.5 rounded-xl border text-[11px] font-extrabold tracking-widest transition-all ${isAdminOpen ? "bg-[#4A69E2] text-white border-[#4A69E2]" : "bg-white text-[#232321] border-gray-300"}`}
          >
            ADMIN <ChevronDown size={14} className={`transition-transform ${isAdminOpen ? "rotate-180" : ""}`} />
          </button>
          
          {isAdminOpen && (
            <div className="absolute top-full right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in slide-in-from-top-2">
               <div className="px-4 py-3 border-b mb-1"><p className="text-sm font-bold">Admin</p></div>
               <button className="w-full flex items-center justify-between px-4 py-3 text-[11px] font-bold hover:bg-gray-50">
                  CHANGE PASSWORD <ChevronDown size={14} className="-rotate-90 text-gray-400" />
               </button>
               <button className="w-full flex items-center justify-between px-4 py-3 text-[11px] font-bold text-red-500 hover:bg-red-50">
                  LOG OUT <LogOut size={14} />
               </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}