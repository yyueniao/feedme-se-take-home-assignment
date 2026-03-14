import { useState } from "react";
import Header from "./Header";
import { PendingSection } from "./PendingSection";
import type { Order } from "./models";

export default function App() {
  const [orders, setOrders] = useState<Order[]>([]);

  const handleOrderAdd = () => {
    const newOrder: Order = {
      id: Math.random().toString(36).slice(2, 11).toUpperCase(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      status: "PENDING",
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
      <Header onOrderAdd={handleOrderAdd} />
      <main className="max-w-7xl mx-auto p-6 md:p-10">
        <PendingSection orders={orders} />
      </main>
    </div>
  );
}
