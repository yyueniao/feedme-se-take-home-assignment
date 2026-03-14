import { useState } from "react";
import type { Order } from "./models";
import { getCurrentTime } from "./utils";

interface Return {
  pendingOrders: Order[];
  completedOrders: Order[];
  addOrder: (type: "NORMAL" | "VIP") => void;
  completeOrder: (order: Order) => void;
  processNextOrder: () => void;
}

export function useOrders(): Return {
  const [nextOrderId, setNextOrderId] = useState(1);
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);

  const completeOrder = (order: Order) => {
    const completedOrder: Order = {
      ...order,
      finishTime: getCurrentTime(),
    };

    setCompletedOrders((prev) => [completedOrder, ...prev]);
  };

  const processNextOrder = (): void => {
    setPendingOrders((prev) => prev.toSpliced(0, 1));
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
  return {
    pendingOrders,
    completedOrders,
    completeOrder,
    processNextOrder,
    addOrder: handleOrderAdd,
  };
}
