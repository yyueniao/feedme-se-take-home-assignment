interface Props {
  onNormalOrderAdd: () => void;
  onVIPOrderAdd: () => void;
}

export default function ActionPanel({
  onNormalOrderAdd,
  onVIPOrderAdd,
}: Props) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
    </section>
  );
}
