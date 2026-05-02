import Image from "next/image";
import { MoreVertical } from "lucide-react";

type Order = {
  id: string;
  product: string;
  date: string;
  customer: string;
  status: "Delivered" | "Canceled";
  amount: string;
  avatar: string;
};

const orders: Order[] = [
  {
    id: "#25426",
    product: "Adidas Ultra boost",
    date: "Jan 8th, 2022",
    customer: "Leo Gouse",
    status: "Delivered",
    amount: "$200.00",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80&auto=format&fit=crop",
  },
  {
    id: "#25425",
    product: "Adidas Ultra boost",
    date: "Jan 7th, 2022",
    customer: "Jaxson Korsgaard",
    status: "Canceled",
    amount: "$200.00",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&auto=format&fit=crop",
  },
  {
    id: "#25424",
    product: "Adidas Ultra boost",
    date: "Jan 6th, 2022",
    customer: "Talan Botosh",
    status: "Delivered",
    amount: "$200.00",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&q=80&auto=format&fit=crop",
  },
  {
    id: "#25423",
    product: "Adidas Ultra boost",
    date: "Jan 5th, 2022",
    customer: "Ryan Philips",
    status: "Canceled",
    amount: "$200.00",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=80&q=80&auto=format&fit=crop",
  },
  {
    id: "#25422",
    product: "Adidas Ultra boost",
    date: "Jan 4th, 2022",
    customer: "Emerson Baptista",
    status: "Delivered",
    amount: "$200.00",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=80&q=80&auto=format&fit=crop",
  },
  {
    id: "#25421",
    product: "Adidas Ultra boost",
    date: "Jan 2th, 2022",
    customer: "Jaxson Calzoni",
    status: "Delivered",
    amount: "$200.00",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80&auto=format&fit=crop",
  },
];

const RecentOrders = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Recent Orders</h3>
        <MoreVertical size={16} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 text-left">
              <th className="pb-3 font-medium">Product</th>
              <th className="pb-3 font-medium">Order ID</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Customer Name</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-gray-100">
                <td className="py-4">{order.product}</td>
                <td className="py-4">{order.id}</td>
                <td className="py-4">{order.date}</td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src={order.avatar}
                      alt={order.customer}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    <span>{order.customer}</span>
                  </div>
                </td>
                <td className="py-4">
                  <span
                    className={`inline-flex items-center gap-2 ${
                      order.status === "Delivered"
                        ? "text-blue-600"
                        : "text-orange-500"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current" />
                    {order.status}
                  </span>
                </td>
                <td className="py-4 text-right">{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;