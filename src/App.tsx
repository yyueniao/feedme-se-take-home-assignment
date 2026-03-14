import { useState } from "react";
import Header from "./Header";
import PendingSection from "./PendingSection";
import ProcessingSection from "./ProcessingSection";
import { CompletedSection } from "./CompletedSection";
import type { Bot, Order } from "./models";
import { getCurrentTime } from "./utils";
import ActionPanel from "./ActionPanel";
import { useBots } from "./useBots";

export default function App() {
  const [nextOrderId, setNextOrderId] = useState(1);
  const [nextBotId, setNextBotId] = useState(1);
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);

  const handleOrderComplete = (order: Order) => {
    const completedOrder: Order = {
      ...order,
      finishTime: getCurrentTime(),
    };

    setCompletedOrders((prev) => [completedOrder, ...prev]);
  };

  const handleOrderProcess = (): void => {
    setPendingOrders((prev) => prev.toSpliced(0, 1));
  };

  const { bots, setBots } = useBots({
    pendingOrders,
    onOrderComplete: handleOrderComplete,
    onOrderProcess: handleOrderProcess,
  });

  const handleAddBot = () => {
    const newBot: Bot = { id: nextBotId, currentOrder: null };
    setNextBotId((prev) => prev + 1);
    setBots((prev) => [...prev, newBot]);
  };

  const handleOrderAdd = (type: "NORMAL" | "VIP") => {
    const newOrder: Order = {
      id: nextOrderId,
      orderTime: getCurrentTime(),
      finishTime: null,
      type,
    };
    setNextOrderId((prev) => prev + 1);

    setPendingOrders((prev) => {
      if (type === "VIP") {
        const lastVip = prev.findLastIndex((o) => o.type === "VIP");
        return prev.toSpliced(lastVip + 1, 0, newOrder);
      }
      return [...prev, newOrder];
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
      <Header />

      <main className="max-w-7xl mx-auto p-6 md:p-10 space-y-10">
        <ActionPanel
          onNormalOrderAdd={() => handleOrderAdd("NORMAL")}
          onVIPOrderAdd={() => handleOrderAdd("VIP")}
          onAddBot={handleAddBot}
        />

        <ProcessingSection bots={bots} />

        <PendingSection orders={pendingOrders} />

        <hr className="border-gray-200" />

        <CompletedSection orders={completedOrders} />
      </main>
    </div>
  );
}
