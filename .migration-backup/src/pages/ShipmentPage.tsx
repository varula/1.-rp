import { KPICard } from "@/components/KPICard";
import { DataTable } from "@/components/DataTable";

const kpis = [
  { label: "Shipments This Week", value: "7", subtext: "3 pending" },
  { label: "On-Time Rate", value: "91.2", unit: "%", subtext: "Target: 95%", alert: true },
  { label: "Containers Booked", value: "4", subtext: "2x 40ft, 2x 20ft" },
  { label: "Pending Inspection", value: "2", alert: true },
];

const shipments = [
  { shipId: "SHP-2026-041", po: "PO-2026-0842", buyer: "ZARA", destination: "BARCELONA", cartons: 48, cbm: "32.4", etd: "16-MAR", status: "LOADING" },
  { shipId: "SHP-2026-039", po: "PO-2026-0839", buyer: "H&M", destination: "HAMBURG", cartons: 85, cbm: "58.2", etd: "19-MAR", status: "INSPECTION" },
  { shipId: "SHP-2026-038", po: "PO-2026-0847", buyer: "LEVI'S", destination: "LOS ANGELES", cartons: 62, cbm: "44.1", etd: "24-MAR", status: "PACKING" },
  { shipId: "SHP-2026-035", po: "PO-2026-0836", buyer: "GAP", destination: "NEW YORK", cartons: 40, cbm: "28.6", etd: "12-MAR", status: "SHIPPED" },
];

const columns = [
  { key: "shipId", header: "Ship ID" },
  { key: "po", header: "PO#" },
  { key: "buyer", header: "Buyer" },
  { key: "destination", header: "Dest." },
  { key: "cartons", header: "Cartons", align: "right" as const },
  { key: "cbm", header: "CBM", align: "right" as const },
  { key: "etd", header: "ETD" },
  {
    key: "status",
    header: "Status",
    render: (val: string) => {
      const isAlert = val === "INSPECTION";
      const isDone = val === "SHIPPED";
      return (
        <span className={`px-2 py-0.5 text-[10px] font-display uppercase tracking-wider border ${
          isAlert ? "border-accent text-accent" : isDone ? "border-secondary text-secondary" : "border-primary text-primary"
        }`}>{val}</span>
      );
    },
  },
];

export default function ShipmentPage() {
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-border">
        {kpis.map((kpi, i) => <KPICard key={i} {...kpi} />)}
      </div>
      <DataTable columns={columns} data={shipments} title="Shipment Tracker" />
    </div>
  );
}
