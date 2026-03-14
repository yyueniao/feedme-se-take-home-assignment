interface Props {
  onNormalOrderAdd: () => void;
  onVIPOrderAdd: () => void;
  onAddBot: () => void;
}

export default function ActionPanel({
  onNormalOrderAdd,
  onVIPOrderAdd,
  onAddBot,
}: Props) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <button
        onClick={onNormalOrderAdd}
        className="flex items-center justify-center gap-3 bg-white border border-gray-200 hover:border-gray-300 py-4 rounded-2xl shadow-sm transition-all active:scale-[0.98] group cursor-pointer"
      >
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-gray-200 transition-colors">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        <span className="font-bold text-gray-700">New Normal Order</span>
      </button>

      <button
        onClick={onVIPOrderAdd}
        className="flex items-center justify-center gap-3 bg-white border border-gray-200 hover:border-[#ffbc0d] py-4 rounded-2xl shadow-sm transition-all active:scale-[0.98] group cursor-pointer"
      >
        <div className="w-8 h-8 rounded-full bg-[#ffbc0d]/10 flex items-center justify-center text-[#ffbc0d] group-hover:bg-[#ffbc0d] group-hover:text-white transition-all">
          <span>👑</span>
        </div>
        <span className="font-bold text-gray-700">New VIP Order</span>
      </button>

      <button
        onClick={onAddBot}
        className="flex items-center justify-center gap-3 bg-white border border-blue-100 hover:border-blue-400 py-4 rounded-2xl shadow-sm transition-all active:scale-[0.98] group cursor-pointer"
      >
        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
            />
          </svg>
        </div>
        <span className="font-bold text-gray-700">Add Bot</span>
      </button>
    </section>
  );
}
