import type { Order } from "./models";
import OrderCard from "./OrderCard";

interface Props {
  orders: Order[];
  processingId: string | null;
}

export function PendingSection({ orders, processingId }: Props) {
  return (
    <section>
      <div className="flex items-center justify-between gap-2 mb-8 border-b border-gray-200 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></div>
          <h2 className="text-xl font-bold tracking-tight text-gray-950">
            Pending Orders
          </h2>
        </div>
        <span className="text-xs font-bold text-gray-400 bg-gray-900 border border-gray-800 px-3 py-1 rounded-full">
          {orders.length} In Queue
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.length === 0 ? (
          <div className="col-span-full border-2 border-dashed border-gray-800 rounded-2xl p-16 text-center bg-gray-900/20">
            <h3 className="text-lg font-semibold text-gray-400 italic">
              Kitchen is empty...
            </h3>
          </div>
        ) : (
          orders.map((order) => {
            return (
              <OrderCard
                order={order}
                key={order.id}
                isProcessing={order.id === processingId}
              />
            );
          })
        )}
      </div>
    </section>
  );
}
