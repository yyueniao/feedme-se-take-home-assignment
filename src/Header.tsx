interface Props {
  onOrderAdd: () => void;
}

export default function Header({ onOrderAdd }: Props) {
  return (
    <nav className="bg-gray-950 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-[#db0007] rounded-xl flex items-center justify-center shadow-lg shadow-red-950/40">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/36/McDonald%27s_Golden_Arches.svg"
              alt="McDonalds Logo"
              className="w-7 h-7 object-contain"
            />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-gray-100 leading-none">
            Orders Center
          </h1>
        </div>

        <button
          onClick={onOrderAdd}
          className="group relative flex items-center gap-2 bg-[#ffbc0d] hover:bg-[#f5b300] text-red-700 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-xl active:scale-95 overflow-hidden cursor-pointer"
        >
          <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />

          <svg
            className="w-4 h-4 text-red-700 group-hover:rotate-90 transition-transform duration-300 relative z-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M12 4v16m8-8H4"
            />
          </svg>

          <span className="relative z-10">New Normal Order</span>
        </button>
      </div>
    </nav>
  );
}
