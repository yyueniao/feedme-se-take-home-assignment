export interface Order {
  id: string;
  orderTime: string;
  finishTime: string | null;
  status: "PENDING" | "COMPLETED";
  type: "NORMAL" | "VIP";
}
