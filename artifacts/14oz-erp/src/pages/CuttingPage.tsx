import { KPICard } from "@/components/KPICard";
import { DataTable } from "@/components/DataTable";
import { HorizontalBarChart } from "@/components/BarChart";

const kpis = [
  { label: "Cut Output Today", value: "4,280", unit: "pcs", subtext: "Target: 4,500" },
  { label: "Fabric Waste", value: "3.2", unit: "%", trend: "down" as const, subtext: "Target: <3%" },
  { label: "Active Tables", value: "6/8", subtext: "2 under maintenance" },
  { label: "Pending Markers", value: "12", alert: true },
];

const allocations = [
  { ticket: "CUT-0847-A", po: "PO-2026-0847", fabric: "14oz RAW SELVEDGE", layers: 48, length: "12.4m", pieces: 960, status: "IN PROGRESS" },
  { ticket: "CUT-0851-A", po: "PO-2026-0851", fabric: "12oz STRETCH", layers: 36, length: "11.8m", pieces: 720, status: "QUEUED" },
  { ticket: "CUT-0839-B", po: "PO-2026-0839", fabric: "10oz CHAMBRAY", layers: 52, length: "13.2m", pieces: 1040, status: "COMPLETED" },
  { ticket: "CUT-0855-A", po: "PO-2026-0855", fabric: "13oz ROPE DYED", layers: 40, length: "12.0m", pieces: 800, status: "MARKER PENDING" },
];

const columns = [
  { key: "ticket", header: "Ticket" },
  { key: "po", header: "PO#" },
  { key: "fabric", header: "Fabric" },
  { key: "layers", header: "Layers", align: "right" as const },
  { key: "length", header: "Spread Len" },
  { key: "pieces", header: "Pieces", align: "right" as const },
  {
    key: "status",
    header: "Status",
    render: (val: string) => {
      const isAlert = val === "MARKER PENDING";
      const isDone = val === "COMPLETED";
      return (
        <span className={`px-2 py-0.5 text-[10px] font-display uppercase tracking-wider border ${
          isAlert ? "border-accent text-accent" : isDone ? "border-secondary text-secondary" : "border-primary text-primary"
        }`}>{val}</span>
      );
    },
  },
];

const wasteData = [
  { label: "Table 1", value: 2.8 },
  { label: "Table 2", value: 3.1 },
  { label: "Table 3", value: 4.5, alert: true },
  { label: "Table 4", value: 2.2 },
  { label: "Table 5", value: 3.8, alert: true },
  { label: "Table 6", value: 2.5 },
];

export default function CuttingPage() {
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-border">
        {kpis.map((kpi, i) => <KPICard key={i} {...kpi} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[1px] bg-border">
        <div className="lg:col-span-8">
          <DataTable columns={columns} data={allocations} title="Cutting Allocations" />
        </div>
        <div className="lg:col-span-4">
          <HorizontalBarChart data={wasteData} title="Fabric Waste % by Table" unit="%" />
        </div>
      </div>
    </div>
  );
}
