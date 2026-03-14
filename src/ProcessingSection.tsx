import OrderCard from "./OrderCard";
import type { Bot } from "./models";

interface Props {
  bots: Bot[];
}

export default function ProcessingSection({ bots }: Props) {
  const isEmpty = bots.length === 0;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 text-blue-600">
        <span className="relative flex h-3 w-3">
          {bots.some((b) => b.currentOrder) && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          )}
          <span
            className={`relative inline-flex rounded-full h-3 w-3 ${isEmpty ? "bg-gray-300" : "bg-blue-500"}`}
          ></span>
        </span>
        <h2
          className={`text-sm font-black uppercase tracking-widest ${isEmpty ? "text-gray-400" : "text-blue-600"}`}
        >
          Bot Status
        </h2>
      </div>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
          <div className="bg-gray-100 p-4 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-gray-600 font-bold">No Bots Commissioned</h3>
          <p className="text-gray-400 text-sm text-center max-w-xs mt-1">
            Your kitchen is currently unstaffed. Add a bot using the control
            panel above to start processing orders.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bots.map((bot) => (
            <div
              key={bot.id}
              className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center min-h-[160px] transition-colors bg-white/50"
            >
              <span className="absolute top-2 left-3 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                Bot #{bot.id.toString().slice(-4)}
              </span>

              {bot.currentOrder ? (
                <div className="w-full">
                  <OrderCard order={bot.currentOrder} type="PROCESSING" />
                </div>
              ) : (
                <div className="text-center space-y-1">
                  <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">
                    Idle
                  </p>
                  <p className="text-gray-300 text-xs">Waiting for orders...</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
