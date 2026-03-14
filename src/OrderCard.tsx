import type { Order } from "./models";

interface Props {
  order: Order;
  type: "PROCESSING" | "PENDING" | "COMPLETED";
}

export default function OrderCard({ order, type }: Props) {
  const isProcessing = type === "PROCESSING";
  const isCompleted = type === "COMPLETED";
  const isPending = type === "PENDING";
  const isVip = order.type === "VIP";

  return (
    <div
      className={`relative group p-6 rounded-2xl border transition-all duration-500 flex flex-col gap-4 overflow-hidden shadow-sm hover:shadow-md ${
        isProcessing
          ? "bg-blue-50 border-blue-500 ring-4 ring-blue-50"
          : isCompleted
            ? "bg-green-50 border-green-200"
            : isVip
              ? "bg-[#ffbc0d] border-[#e6a800] text-red-900 shadow-[0_4px_20px_-5px_rgba(255,188,13,0.5)]"
              : "bg-white border-gray-100"
      }`}
    >
      {isProcessing && (
        <div className="absolute bottom-0 left-0 h-1.5 bg-blue-500 animate-[progress_10s_linear_forwards] z-20" />
      )}

      <div className="flex justify-between items-start relative z-10">
        <div>
          <span
            className={`text-[10px] font-mono block mb-1 uppercase tracking-widest font-black ${
              isProcessing
                ? "text-blue-400"
                : isVip && isPending
                  ? "text-red-700/50"
                  : "text-gray-400"
            }`}
          >
            #{order.id}
          </span>
          <div className="flex items-center gap-2">
            <span
              className={`text-base font-black ${
                isProcessing
                  ? "text-blue-900"
                  : isVip && isPending
                    ? "text-red-900"
                    : "text-gray-900"
              }`}
            >
              {isVip ? "VIP PRIORITY" : "NORMAL ORDER"}
            </span>
            {isVip && <span>👑</span>}
          </div>
        </div>

        <span
          className={`inline-flex items-center text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-tighter shadow-sm ${
            isProcessing
              ? "bg-blue-600 text-white animate-pulse"
              : isCompleted
                ? "bg-green-600 text-white"
                : isVip
                  ? "bg-white text-red-700"
                  : "bg-gray-900 text-white"
          }`}
        >
          {isProcessing
            ? "🍳 Cooking"
            : isCompleted
              ? "Ready"
              : isVip
                ? "Urgent"
                : "Queued"}
        </span>
      </div>

      <div
        className={`mt-auto pt-4 border-t flex items-center justify-between relative z-10 ${
          isProcessing
            ? "border-blue-100"
            : isVip && isPending
              ? "border-red-900/10"
              : "border-gray-100"
        }`}
      >
        <p
          className={`text-[11px] font-bold uppercase tracking-widest ${
            isProcessing
              ? "text-blue-400"
              : isVip && isPending
                ? "text-red-700/60"
                : "text-gray-400"
          }`}
        >
          {isCompleted ? "Served At" : "Logged At"}
        </p>
        <p
          className={`text-sm font-black font-mono ${
            isProcessing
              ? "text-blue-900"
              : isVip && isPending
                ? "text-red-900"
                : "text-gray-900"
          }`}
        >
          {isCompleted ? order.finishTime : order.orderTime}
        </p>
      </div>
    </div>
  );
}
