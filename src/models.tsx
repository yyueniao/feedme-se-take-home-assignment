export interface Order {
  id: string;
  timestamp: string;
  status: "PENDING" | "COMPLETED";
}
