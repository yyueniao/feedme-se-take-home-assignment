import { useState } from "react";
import Header from "./Header";
import PendingSection from "./PendingSection";
import ProcessingSection from "./ProcessingSection";
import { CompletedSection } from "./CompletedSection";
import type { Order } from "./models";
import { getCurrentTime } from "./utils";
import ActionPanel from "./ActionPanel";

export default function App() {
  const [processingOrder, setProcessingOrder] = useState<Order | null>(null);
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);

  const processNextOrder = () => {
    setPendingOrders((prevPending) => {
      if (prevPending.length === 0) return prevPending;

      const [nextOrder, ...remainingOrders] = prevPending;

      setProcessingOrder(nextOrder);

      setTimeout(() => {
        handleCompleteOrder(nextOrder);
      }, 10000);

      return remainingOrders;
    });
  };

  const handleCompleteOrder = (order: Order) => {
    const finishedOrder: Order = {
      ...order,
      status: "COMPLETED",
      finishTime: getCurrentTime(),
    };
    setCompletedOrders((prev) => [finishedOrder, ...prev]);
    setProcessingOrder(null);
    processNextOrder();
  };

  const handleOrderAdd = (type: "NORMAL" | "VIP") => {
    const newOrder: Order = {
      id: Math.random().toString(36).slice(2, 11).toUpperCase(),
      orderTime: getCurrentTime(),
      finishTime: null,
      status: "PENDING",
      type,
    };

    setPendingOrders((prev) => {
      let updatedPending: Order[];

      if (type === "VIP") {
        const lastVipIndex = prev.findLastIndex((o) => o.type === "VIP");
        updatedPending = prev.toSpliced(lastVipIndex + 1, 0, newOrder);
      } else {
        updatedPending = [...prev, newOrder];
      }

      return updatedPending;
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

        {processingOrder && <ProcessingSection orders={[processingOrder]} />}

        <PendingSection orders={pendingOrders} />

        <hr className="border-gray-200" />

        <CompletedSection orders={completedOrders} />
      </main>
    </div>
  );
}
