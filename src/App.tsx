import { useState } from "react";
import Header from "./Header";
import { PendingSection } from "./PendingSection";
import { CompletedSection } from "./CompletedSection";
import type { Order } from "./models";

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
            o.id === nextOrder.id ? { ...o, status: "COMPLETED" as const } : o,
          );

          setProcessingId(null);

          processNextOrder(updatedOrders);
          return updatedOrders;
        });
      }, 10000);
    }
  };

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

    const newOrders = [...orders, newOrder];
    setOrders(newOrders);

    if (!processingId) {
      processNextOrder(newOrders);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
      <Header onOrderAdd={handleOrderAdd} />
      <main className="max-w-7xl mx-auto p-6 md:p-10 space-y-12">
        <PendingSection
          orders={orders.filter((o) => o.status === "PENDING")}
          processingId={processingId}
        />

        <hr className="border-gray-800" />

        <CompletedSection
          orders={orders.filter((o) => o.status === "COMPLETED")}
        />
      </main>
    </div>
  );
}
