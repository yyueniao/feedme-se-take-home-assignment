import { useState } from "react";
import Header from "./Header";
import { PendingSection } from "./PendingSection";
import { CompletedSection } from "./CompletedSection";
import type { Order } from "./models";
import { getCurrentTime } from "./utils";
import ActionPanel from "./ActionPanel";

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
        <ActionPanel
          onNormalOrderAdd={() => handleOrderAdd("NORMAL")}
          onVIPOrderAdd={() => handleOrderAdd("VIP")}
        />

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
