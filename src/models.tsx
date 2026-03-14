export interface Order {
  id: number;
  orderTime: string;
  finishTime: string | null;
  status: "PENDING" | "COMPLETED";
  type: "NORMAL" | "VIP";
}

export interface Bot {
  id: number;
  currentOrder: Order | null;
}
