import type { Order } from "./models";

interface Props {
  order: Order;
  isProcessing?: boolean;
}

export default function OrderCard({ order, isProcessing = false }: Props) {
  const isCompleted = order.status === "COMPLETED";
  const isVip = order.type === "VIP";

  return (
    <div
      className={`relative group p-6 rounded-2xl border transition-all duration-500 flex flex-col gap-4 overflow-hidden shadow-sm hover:shadow-md ${
        isProcessing
          ? "bg-blue-100 border-blue-700 text-white ring-4 ring-blue-100"
          : isCompleted
            ? "bg-green-50 border-green-200"
            : isVip
              ? "bg-[#ffbc0d] border-[#e6a800] text-red-900 shadow-[0_4px_20px_-5px_rgba(255,188,13,0.5)]"
              : "bg-white border-gray-100"
      }`}
    >
      {/* Bot Progress Bar (Visible only during cooking) */}
      {isProcessing && (
        <div className="absolute bottom-0 left-0 h-2 bg-[#ffbc0d] animate-[progress_10s_linear_forwards] z-20" />
      )}

      <div className="flex justify-between items-start relative z-10">
        <div>
          <span
            className={`text-[10px] font-mono block mb-1 uppercase tracking-widest font-black ${
              isVip && !isCompleted && !isProcessing
                ? "text-red-200"
                : "text-gray-400"
            }`}
          >
            #{order.id}
          </span>
          <div className="flex items-center gap-2">
            <span
              className={`text-base font-black ${
                isVip && !isCompleted && !isProcessing
                  ? "text-white"
                  : "text-gray-900"
              }`}
            >
              {isVip ? "VIP PRIORITY" : "NORMAL ORDER"}
            </span>
            {isVip && <span>👑</span>}
          </div>
        </div>

        {/* Status Badge */}
        <span
          className={`inline-flex items-center text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-tighter shadow-sm ${
            isProcessing
              ? "bg-[#ffbc0d] text-red-900 animate-bounce"
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
          isVip && !isCompleted && !isProcessing
            ? "border-white/20"
            : "border-gray-100"
        }`}
      >
        <p
          className={`text-[11px] font-bold uppercase tracking-widest ${
            isVip && !isCompleted && !isProcessing
              ? "text-red-100"
              : "text-gray-400"
          }`}
        >
          {isCompleted ? "Served At" : "Logged At"}
        </p>
        <p
          className={`text-sm font-black font-mono ${
            isVip && !isCompleted && !isProcessing
              ? "text-white"
              : "text-gray-900"
          }`}
        >
          {isCompleted ? order.finishTime : order.orderTime}
        </p>
      </div>
    </div>
  );
}
