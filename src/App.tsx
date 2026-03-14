import { useState } from "react";
import Header from "./Header";
import { PendingSection } from "./PendingSection";
import { CompletedSection } from "./CompletedSection";
import type { Order } from "./models";
import { getCurrentTime } from "./utils";

export default function App() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const processNextOrder = (currentOrders: Order[]) => {
    const nextOrder = currentOrders.find((o) => o.status === "PENDING");

    if (nextOrder) {
      setProcessingId(nextOrder.id);

      setTimeout(() => {
        setOrders((prev) => {
          const updatedOrders = prev.map((o) =>
            o.id === nextOrder.id
              ? {
                  ...o,
                  status: "COMPLETED" as const,
                  finishTime: getCurrentTime(),
                }
              : o,
          );

          setProcessingId(null);
          processNextOrder(updatedOrders);
          return updatedOrders;
        });
      }, 10000);
    }
  };

  const handleOrderAdd = (type: "NORMAL" | "VIP") => {
    const newOrder: Order = {
      id: Math.random().toString(36).slice(2, 11).toUpperCase(),
      orderTime: getCurrentTime(),
      finishTime: null,
      status: "PENDING",
      type,
    };

    setOrders((prevOrders) => {
      let newOrders: Order[];

      if (type === "VIP") {
        const lastVipIndex = prevOrders.findLastIndex(
          (o) => o.type === "VIP" && o.status === "PENDING",
        );
        newOrders = prevOrders.toSpliced(lastVipIndex + 1, 0, newOrder);
      } else {
        newOrders = [...prevOrders, newOrder];
      }

      if (!processingId) {
        processNextOrder(newOrders);
      }

      return newOrders;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
      <Header />

      <main className="max-w-7xl mx-auto p-6 md:p-10 space-y-10">
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => handleOrderAdd("NORMAL")}
            className="flex items-center justify-center gap-3 bg-white border border-gray-200 hover:border-gray-300 py-4 rounded-2xl shadow-sm transition-all active:scale-[0.98] group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-gray-200 transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <span className="font-bold text-gray-700">New Normal Order</span>
          </button>

          <button
            onClick={() => handleOrderAdd("VIP")}
            className="flex items-center justify-center gap-3 bg-white border border-gray-200 hover:border-[#ffbc0d] py-4 rounded-2xl shadow-sm transition-all active:scale-[0.98] group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#ffbc0d]/10 flex items-center justify-center text-[#ffbc0d] group-hover:bg-[#ffbc0d] group-hover:text-white transition-all">
              <span>👑</span>
            </div>
            <span className="font-bold text-gray-700">New VIP Order</span>
          </button>
        </section>

        <PendingSection
          orders={orders.filter((o) => o.status === "PENDING")}
          processingId={processingId}
        />

        <hr className="border-gray-200" />

        <CompletedSection
          orders={orders.filter((o) => o.status === "COMPLETED")}
        />
      </main>
    </div>
  );
}
