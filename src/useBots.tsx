import { useEffectEvent, useEffect, useState } from "react";
import type { Order, Bot } from "./models";

interface Props {
  pendingOrders: Order[];
  onOrderComplete: (order: Order) => void;
  onOrderProcess: () => void;
}

export function useBots({
  pendingOrders,
  onOrderComplete,
  onOrderProcess,
}: Props): { bots: Bot[]; addBot: () => void } {
  const [nextBotId, setNextBotId] = useState(1);
  const [bots, setBots] = useState<Bot[]>([]);

  const addBot = () => {
    const newBot: Bot = { id: nextBotId, currentOrder: null };
    setNextBotId((prev) => prev + 1);
    setBots((prev) => [...prev, newBot]);
  };

  const handleOrderComplete = (order: Order, botId: number) => {
    onOrderComplete(order);

    setBots((prevBots) =>
      prevBots.map((b) => (b.id === botId ? { ...b, currentOrder: null } : b)),
    );
  };

  const processOrder = useEffectEvent((bot: Bot, order: Order) => {
    onOrderProcess();
    setBots((prevBots) =>
      prevBots.map((b) =>
        b.id === bot.id ? { ...b, currentOrder: order } : b,
      ),
    );
    setTimeout(() => {
      handleOrderComplete(order, bot.id);
    }, 10000);
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

  return { bots, addBot };
}
