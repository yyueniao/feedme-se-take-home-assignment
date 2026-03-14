import OrderCard from "./OrderCard";
import type { Order } from "./models";

export default function ProcessingSection({ orders }: { orders: Order[] }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 text-blue-600">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
        </span>
        <h2 className="text-sm font-black uppercase tracking-widest">Bot</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} isProcessing={true} />
        ))}
      </div>
    </section>
  );
}
