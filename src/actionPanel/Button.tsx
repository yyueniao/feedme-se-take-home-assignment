import type { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  text: string;
  onClick: () => void;
}

export default function Button({ icon, text, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-3 bg-white border border-gray-200 hover:border-[#ffbc0d] py-4 rounded-2xl shadow-sm transition-all active:scale-[0.98] group cursor-pointer"
    >
      <div className="w-8 h-8 rounded-full bg-[#ffbc0d]/10 flex items-center justify-center text-[#ffbc0d] group-hover:bg-[#ffbc0d] group-hover:text-white transition-all">
        {icon}
      </div>
      <span className="font-bold text-gray-700">{text}</span>
    </button>
  );
}
