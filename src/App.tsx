import Header from "./Header";
import PendingSection from "./PendingSection";
import ProcessingSection from "./ProcessingSection";
import { CompletedSection } from "./CompletedSection";
import ActionPanel from "./actionPanel/ActionPanel";
import { useBots } from "./useBots";
import { useOrders } from "./useOrders";

export default function App() {
  const {
    pendingOrders,
    completedOrders,
    completeOrder,
    cancelOrder,
    processNextOrder,
    addOrder,
  } = useOrders();

  const { bots, addBot, removeNewestBot } = useBots({
    pendingOrders,
    onOrderComplete: completeOrder,
    onOrderCancel: cancelOrder,
    processNextOrder,
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
      <Header />

      <main className="max-w-7xl mx-auto p-6 md:p-10 space-y-10">
        <ActionPanel
          onNormalOrderAdd={() => addOrder("NORMAL")}
          onVIPOrderAdd={() => addOrder("VIP")}
          onAddBot={addBot}
          onRemoveBot={removeNewestBot}
        />

        <ProcessingSection bots={bots} />

        <PendingSection orders={pendingOrders} />

        <hr className="border-gray-200" />

        <CompletedSection orders={completedOrders} />
      </main>
    </div>
  );
}
