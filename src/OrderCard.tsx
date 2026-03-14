import type { Order } from "./models";

interface Props {
  order: Order;
  isProcessing?: boolean;
}

export default function OrderCard({ order, isProcessing = false }: Props) {
  const isCompleted = order.status === "COMPLETED";

  return (
    <div
      className={`relative group p-6 rounded-2xl border transition-all duration-500 flex flex-col gap-4 overflow-hidden ${
        isProcessing
          ? "bg-white border-[#ffbc0d] shadow-[0_10px_30px_-10px_rgba(255,188,13,0.3)] ring-1 ring-[#ffbc0d]/20"
          : isCompleted
            ? "bg-white border-green-100 hover:border-green-200 shadow-sm"
            : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-md"
      }`}
    >
      {isProcessing && (
        <div className="absolute bottom-0 left-0 h-1.5 bg-[#ffbc0d] animate-[progress_10s_linear_forwards] z-20" />
      )}

      <div
        className={`absolute -top-6 -right-6 w-12 h-12 rounded-full transition-colors duration-500 ${
          isProcessing
            ? "bg-[#db0007]/10"
            : isCompleted
              ? "bg-green-50"
              : "bg-gray-50"
        }`}
      />

      <div className="flex justify-between items-start relative z-10">
        <div>
          <span className="text-[10px] font-mono text-gray-400 block mb-1 uppercase tracking-widest font-bold">
            #{order.id}
          </span>
          <span className="text-base font-extrabold text-gray-900">
            McDelivery™
          </span>
        </div>

        <span
          className={`inline-flex items-center text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-tight transition-all duration-300 ${
            isProcessing
              ? "bg-[#db0007] text-white animate-pulse"
              : isCompleted
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-500"
          }`}
        >
          {isProcessing ? (
            "🍳 Processing"
          ) : isCompleted ? (
            <span className="flex items-center gap-1">
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={4}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Ready
            </span>
          ) : (
            order.status
          )}
        </span>
      </div>

      <div
        className={`mt-auto pt-4 border-t flex items-center justify-between relative z-10 transition-colors duration-500 ${
          isProcessing ? "border-[#ffbc0d]/20" : "border-gray-50"
        }`}
      >
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          {isCompleted ? "Finished" : "Received"}
        </p>
        <p
          className={`text-sm font-bold font-mono ${isCompleted ? "text-green-600" : "text-gray-700"}`}
        >
          {isCompleted ? order.finishTime : order.orderTime}
        </p>
      </div>
    </div>
  );
}
