import { useState, useEffect, useEffectEvent } from "react";
import Header from "./Header";
import PendingSection from "./PendingSection";
import ProcessingSection from "./ProcessingSection";
import { CompletedSection } from "./CompletedSection";
import type { Bot, Order } from "./models";
import { getCurrentTime } from "./utils";
import ActionPanel from "./ActionPanel";

export default function App() {
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
  const [bots, setBots] = useState<Bot[]>([]);

  const handleCompleteOrder = (order: Order, botId: number) => {
    const completedOrder: Order = {
      ...order,
      status: "COMPLETED",
      finishTime: getCurrentTime(),
    };

    setCompletedOrders((prev) => [completedOrder, ...prev]);

    setBots((prevBots) =>
      prevBots.map((b) => (b.id === botId ? { ...b, currentOrder: null } : b)),
    );
  };

  const processOrder = useEffectEvent((bot: Bot) => {
    const nextOrder = pendingOrders[0];
    setPendingOrders((prev) => prev.toSpliced(0, 1));
    setBots((prevBots) =>
      prevBots.map((b) =>
        b.id === bot.id ? { ...b, currentOrder: nextOrder } : b,
      ),
    );
    setTimeout(() => {
      handleCompleteOrder(nextOrder, bot.id);
    }, 10000);
  });

  useEffect(() => {
    const idleBot = bots.find((b) => b.currentOrder === null);

    if (idleBot && pendingOrders.length > 0) {
      processOrder(idleBot);
    }
  }, [pendingOrders, bots]);

  const handleAddBot = () => {
    const newBot: Bot = { id: Date.now(), currentOrder: null };
    setBots((prev) => [...prev, newBot]);
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
