import { KPICard } from "@/components/KPICard";
import { DataTable } from "@/components/DataTable";
import { HorizontalBarChart } from "@/components/BarChart";

const KPIS = [
  { label: "Active POs", value: "14", subtext: "5 buyers" },
  { label: "On-Time Delivery", value: "91.2", unit: "%", subtext: "Target: 95%", alert: true },
  { label: "Pending Approvals", value: "6", alert: true, subtext: "3 overdue" },
  { label: "Samples in Transit", value: "8", subtext: "ETA: 3-7 days" },
];

const PO_TRACKER = [
  { po: "PO-2026-0847", buyer: "LEVI'S", style: "501-XX-RAW", qty: 5000, shipDate: "22-MAR", cm: "$4.80", otdRisk: "LOW", status: "ON TRACK" },
  { po: "PO-2026-0851", buyer: "GAP", style: "SLIM-DARK", qty: 3200, shipDate: "28-MAR", cm: "$4.20", otdRisk: "MEDIUM", status: "CUTTING" },
  { po: "PO-2026-0839", buyer: "H&M", style: "WIDE-STONE", qty: 8000, shipDate: "18-MAR", cm: "$3.90", otdRisk: "HIGH", status: "DELAYED" },
  { po: "PO-2026-0855", buyer: "UNIQLO", style: "STRAIGHT-IND", qty: 6000, shipDate: "05-APR", cm: "$4.50", otdRisk: "LOW", status: "ON TRACK" },
  { po: "PO-2026-0842", buyer: "ZARA", style: "SKINNY-BLK", qty: 4500, shipDate: "15-MAR", cm: "$5.10", otdRisk: "HIGH", status: "FINISHING" },
  { po: "PO-2026-0860", buyer: "NEXT", style: "BOOTCUT-MED", qty: 2800, shipDate: "12-APR", cm: "$4.00", otdRisk: "LOW", status: "FABRIC PENDING" },
];

const COLUMNS = [
  { key: "po", header: "PO#" },
  { key: "buyer", header: "Buyer" },
  { key: "style", header: "Style" },
  { key: "qty", header: "Order Qty", align: "right" as const },
  { key: "shipDate", header: "Ship Date" },
  { key: "cm", header: "CM (USD)", align: "right" as const },
  {
    key: "otdRisk",
    header: "OTD Risk",
    render: (val: string) => {
      const isHigh = val === "HIGH";
      const isMed = val === "MEDIUM";
      return (
        <span className={`chip ${
          isHigh ? "chip-alert" : isMed ? "chip-primary" : "chip-secondary"
        }`}>{val}</span>
      );
    },
  },
  {
    key: "status",
    header: "Status",
    render: (val: string) => {
      const isDelayed = val === "DELAYED" || val === "FABRIC PENDING";
      return (
        <span className={`chip ${
          isDelayed ? "chip-alert" : "chip-secondary"
        }`}>{val}</span>
      );
    },
  },
];

const BUYER_REVENUE = [
  { label: "LEVI'S", value: 24000 },
  { label: "H&M", value: 31200, alert: true },
  { label: "ZARA", value: 22950 },
  { label: "GAP", value: 13440 },
  { label: "UNIQLO", value: 27000 },
  { label: "NEXT", value: 11200 },
];

export default function MerchandisingPage() {
  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Merchandising</h1>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPIS.map((kpi, i) => <KPICard key={i} {...kpi} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <DataTable columns={COLUMNS} data={PO_TRACKER} title="PO Tracker — Merchandising" />
        </div>
        <div className="lg:col-span-4">
          <HorizontalBarChart data={BUYER_REVENUE} title="Revenue by Buyer (CM × Qty)" unit="$" />
        </div>
      </div>
    </div>
  );
}
