import Button from "./Button";

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
      <Button
        onClick={onNormalOrderAdd}
        text="New Normal Order"
        icon={
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
        }
      />

      <Button
        onClick={onVIPOrderAdd}
        text="New VIP Order"
        icon={<span>👑</span>}
      />

      <Button
        onClick={onAddBot}
        text="Add Bot"
        icon={
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
        }
      />
    </section>
  );
}
