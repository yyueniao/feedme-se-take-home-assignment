export default function Header() {
  return (
    <nav className="bg-gray-950 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-[#db0007] rounded-xl flex items-center justify-center shadow-lg shadow-red-950/40">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/36/McDonald%27s_Golden_Arches.svg"
              alt="McDonalds Logo"
              className="w-7 h-7 object-contain"
            />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold tracking-tight text-gray-100 leading-none">
              Orders Center
            </h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
              Kitchen Dashboard
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}
