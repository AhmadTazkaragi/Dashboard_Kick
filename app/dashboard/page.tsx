import BestSellersCard from "@/components/BestSellersCard";
import RecentOrders from "@/components/RecentOrders";
import SalesGraph from "@/components/SalesGraph";
import { CalendarDaysIcon } from "lucide-react";
import { MoreVertical } from "lucide-react";
import { Handbag } from "lucide-react";
import { ArrowUp } from "lucide-react";


export default function DashboardPage() {
  return (
   <div className="px-4 sm:px-6">
    <div className="p-1">
  <h1 className="font-bold text-2xl">Dashboard</h1>
    </div>
  

    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-1 gap-2">
  <p className="text-sm sm:text-base">Home {">"} Dashboard</p>
  <div className="flex items-center gap-2 text-sm sm:text-base">
        <CalendarDaysIcon size={16} />
        <span>{new Date().toLocaleDateString('en-GB')}</span> {/* dd/mm/yyyy */}
     </div>
     </div>

{/* cards */}
<div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_360px] gap-4">
  <div className="p-5 rounded-lg bg-[#FAFAFA] w-full mt-2 mb-2">
    <div className="flex justify-between items-center">
    <h2 className="font-medium">Total orders </h2>
    <MoreVertical size={16} />
    </div>
    <div className="flex justify-between items-center ">
      <div className="py-2 flex gap-2 items-center">
        <div className="inline-flex items-center justify-center p-2 bg-[#4A69E2] rounded-md">
          <Handbag size={20} className="text-white" />
        </div>
        <h1 className="font-medium">200$</h1>
     
      </div>
      <div className="flex items-center gap-1">
         <ArrowUp />
         <h3>34%</h3>
         </div>
    </div>
       <div className="flex justify-end">
   <p className="text-sm text-black/70">Compared to Jan 2022</p>
    </div>
  </div>
{/*  */}

  <div className="p-5 rounded-lg bg-[#FAFAFA] w-full mt-2 mb-2">
    <div className="flex justify-between items-center">
    <h2 className="font-medium">Active orders </h2>
    <MoreVertical size={16} />
    </div>
    <div className="flex justify-between items-center ">
      <div className="py-2 flex gap-2 items-center">
        <div className="inline-flex items-center justify-center p-2 bg-[#4A69E2] rounded-md">
          <Handbag size={20} className="text-white" />
        </div>
        <h1 className="font-medium">200$</h1>
     
      </div>
      <div className="flex items-center gap-1">
         <ArrowUp />
         <h3>34%</h3>
         </div>
    </div>
    <div className="flex justify-end">
   <p className="text-sm text-black/70">Compared to Jan 2022</p>
    </div>
  </div>
{/*  */}
  <div className="p-5 rounded-lg bg-[#FAFAFA] w-full mt-2 mb-2">
    <div className="flex justify-between items-center">
    <h2 className="font-medium">Shipped orders </h2>
    <MoreVertical size={16} />
    </div>
    <div className="flex justify-between items-center ">
      <div className="py-2 flex gap-2 items-center">
        <div className="inline-flex items-center justify-center p-2 bg-[#4A69E2] rounded-md">
          <Handbag size={20} className="text-white" />
        </div>
        <h1 className="font-medium">200$</h1>
     
      </div>
      <div className="flex items-center gap-1">
         <ArrowUp />
         <h3>34%</h3>
         </div>
    </div>
       <div className="flex justify-end">
   <p className="text-sm text-black/70">Compared to Jan 2022</p>
    </div>
  </div>
</div>
{/* end cards */}
<div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_360px] gap-4 items-stretch">
  <div className="lg:col-span-2 h-full">
    <SalesGraph />
  </div>
  <div className="lg:col-span-1 h-full">
    <BestSellersCard />
  </div>
</div>
{/*  */}
<div className="my-2">
  <RecentOrders />
</div>
{/*  */}

   </div>
 
  );
}