import React from 'react'
import { CalendarDaysIcon, ChevronDown, MoreVertical } from "lucide-react";
import Image from "next/image";

const orders = [
  {
    id: "#25421",
    product: "Adidas Ultra boost",
    date: "Jan 8th, 2022",
    payment: "PayPal",
    customer: "Bessie Cooper",
    status: "Delivered",
    amount: "$200.00",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80&auto=format&fit=crop",
  },
  {
    id: "#25421",
    product: "Adidas Ultra boost",
    date: "Jan 8th, 2022",
    payment: "Pioneer",
    customer: "Bessie Cooper",
    status: "Canceled",
    amount: "$200.00",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&auto=format&fit=crop",
  },
  {
    id: "#25421",
    product: "Adidas Ultra boost",
    date: "Jan 8th, 2022",
    payment: "Cash",
    customer: "Bessie Cooper",
    status: "Delivered",
    amount: "$200.00",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&q=80&auto=format&fit=crop",
  },
  {
    id: "#25421",
    product: "Adidas Ultra boost",
    date: "Jan 8th, 2022",
    payment: "PayPal",
    customer: "Bessie Cooper",
    status: "Canceled",
    amount: "$200.00",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=80&q=80&auto=format&fit=crop",
  },
  {
    id: "#25421",
    product: "Adidas Ultra boost",
    date: "Jan 8th, 2022",
    payment: "Cash",
    customer: "Bessie Cooper",
    status: "Delivered",
    amount: "$200.00",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80&auto=format&fit=crop",
  },
  {
    id: "#25421",
    product: "Adidas Ultra boost",
    date: "Jan 8th, 2022",
    payment: "Pioneer",
    customer: "Bessie Cooper",
    status: "Canceled",
    amount: "$200.00",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&auto=format&fit=crop",
  },
  {
    id: "#25421",
    product: "Adidas Ultra boost",
    date: "Jan 8th, 2022",
    payment: "Cash",
    customer: "Bessie Cooper",
    status: "Delivered",
    amount: "$200.00",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&q=80&auto=format&fit=crop",
  },
];

export default function Page() {
  return (
    <div className="px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Orders List</h1>
          <p className="text-sm text-black/60">Home &gt; Order List</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-black/70">
            <CalendarDaysIcon size={16} />
            <span>Feb 16,2022 - Feb 20,2022</span>
          </div>

          <button className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg">
            Change Status
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="mt-4 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center justify-between p-4">
          <h3 className="font-semibold">Recent Purchases</h3>
          <MoreVertical size={16} className="text-gray-400" />
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="text-left text-gray-400 border-t border-b border-gray-100">
                <th className="py-3 px-4 w-8 whitespace-nowrap">
                  <input type="checkbox" />
                </th>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <input type="checkbox" />
                  </td>
                  <td className="py-3 px-4">{o.product}</td>
                  <td className="py-3 px-4">{o.id}</td>
                  <td className="py-3 px-4">{o.date}</td>
                  <td className="py-3 px-4">{o.payment}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Image
                        src={o.avatar}
                        alt={o.customer}
                        width={20}
                        height={20}
                        className="rounded-full"
                        style={{ width: "20px", height: "20px" }}
                      />
                      {o.customer}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-2 ${
                        o.status === "Delivered"
                          ? "text-blue-600"
                          : "text-orange-500"
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current" />
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">{o.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 flex items-center gap-2 text-sm">
          <button className="w-7 h-7 rounded-md bg-black text-white">1</button>
          <button className="w-7 h-7 rounded-md border border-gray-300">
            2
          </button>
          <button className="w-7 h-7 rounded-md border border-gray-300">
            3
          </button>
          <span className="px-2">...</span>
          <button className="w-7 h-7 rounded-md border border-gray-300">
            10
          </button>
          <button className="px-3 h-7 rounded-md border border-gray-300">
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
}
