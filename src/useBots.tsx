import { useEffectEvent, useEffect, useState } from "react";
import type { Order, Bot } from "./models";

interface Props {
  pendingOrders: Order[];
  onOrderComplete: (order: Order) => void;
  onOrderCancel: (order: Order) => void;
  processNextOrder: () => void;
}

interface Return {
  bots: Bot[];
  addBot: () => void;
  removeNewestBot: () => void;
}

export function useBots({
  pendingOrders,
  onOrderComplete,
  onOrderCancel,
  processNextOrder,
}: Props): Return {
  const [nextBotId, setNextBotId] = useState(1);
  const [bots, setBots] = useState<Bot[]>([]);

  const addBot = () => {
    const newBot: Bot = {
      id: nextBotId,
      currentOrder: null,
      currentTask: null,
    };
    setNextBotId((prev) => prev + 1);
    setBots((prev) => [...prev, newBot]);
  };

  const removeNewestBot = () => {
    const newestBot = bots[bots.length - 1];
    if (newestBot.currentOrder !== null) {
      onOrderCancel(newestBot.currentOrder);
    }
    if (newestBot.currentTask !== null) {
      clearTimeout(newestBot.currentTask);
    }
    setBots((prev) => prev.toSpliced(prev.length - 1, 1));
  };

  const handleOrderComplete = (order: Order, botId: number) => {
    onOrderComplete(order);

    setBots((prevBots) =>
      prevBots.map((b) => (b.id === botId ? { ...b, currentOrder: null } : b)),
    );
  };

  const processOrder = useEffectEvent((bot: Bot, order: Order) => {
    processNextOrder();

    const taskId = setTimeout(() => {
      handleOrderComplete(order, bot.id);
    }, 10000);

    setBots((prevBots) =>
      prevBots.map((b) =>
        b.id === bot.id
          ? { ...b, currentOrder: order, currentTask: taskId }
          : b,
      ),
    );
  });

  useEffect(() => {
    if (pendingOrders.length === 0) {
      return;
    }

    const idleBot = bots.find((b) => b.currentOrder === null);

    if (idleBot) {
      processOrder(idleBot, pendingOrders[0]);
    }
  }, [pendingOrders, bots]);

  return { bots, addBot, removeNewestBot };
}
