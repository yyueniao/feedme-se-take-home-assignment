import type { Order } from "./models";

interface Props {
  orders: Order[];
}

export function PendingSection({ orders }: Props) {
  return (
    <section>
      <div className="flex items-center justify-between gap-2 mb-8 border-b border-gray-200 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></div>
          <h2 className="text-xl font-semibold tracking-tight text-gray-950">
            Pending Orders
          </h2>
        </div>
        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {orders.length} Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.length === 0 ? (
          <div className="col-span-full border-2 border-dashed border-gray-200 rounded-2xl p-16 text-center bg-white">
            <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              All caught up!
            </h3>
            <p className="text-gray-500 text-sm mt-1 max-w-xs mx-auto">
              Click "New Normal Order" to populate the pending area with
              incoming requests.
            </p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm transition-all hover:border-blue-100 hover:shadow-md animate-in fade-in slide-in-from-top-4 duration-300 flex flex-col gap-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-mono text-gray-400 block mb-1">
                    #{order.id}
                  </span>
                  <span className="text-base font-semibold text-gray-950">
                    Normal Delivery
                  </span>
                </div>
                <span className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700">
                  {order.status}
                </span>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-600">Created At:</p>
                <p className="text-sm font-semibold text-gray-950">
                  {order.timestamp}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
