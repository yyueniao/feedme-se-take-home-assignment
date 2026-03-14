import type { Order } from "./models";
import OrderCard from "./OrderCard";

interface Props {
  orders: Order[];
}

export function CompletedSection({ orders }: Props) {
  return (
    <section className="animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-gray-950">
            Completed Orders
          </h2>
        </div>
        <span className="text-xs font-bold text-gray-400 bg-gray-900 border border-gray-800 px-3 py-1 rounded-full">
          {orders.length} Served
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.length === 0 ? (
          <div className="col-span-full py-12 border-2 border-dashed border-gray-800 rounded-2xl flex flex-col items-center justify-center text-gray-600">
            <p className="text-sm italic">
              Waiting for the bot to finish cooking...
            </p>
          </div>
        ) : (
          orders.map((order) => (
            <OrderCard key={order.id} order={order} type="COMPLETED" />
          ))
        )}
      </div>
    </section>
  );
}
