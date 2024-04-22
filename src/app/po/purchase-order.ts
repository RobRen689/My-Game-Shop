import { PurchaseOrderItem } from "./purchase-order-item";

export interface PurchaseOrder {
  id: number;
  vendorid: number;
  amount: number;
  podate: string;
  items: PurchaseOrderItem[];
}
