import { KPICard } from "@/components/KPICard";
import { DataTable } from "@/components/DataTable";

const kpis = [
  { label: "Machines Active", value: "8/10", subtext: "2 in maintenance" },
  { label: "Daily Throughput", value: "3,200", unit: "pcs" },
  { label: "Avg Cycle Time", value: "45", unit: "min", subtext: "Target: 40 min" },
  { label: "Rewash Rate", value: "4.1", unit: "%", alert: true, subtext: "Target: <3%" },
];

const washBatches = [
  { batch: "WSH-0847-01", po: "PO-2026-0847", recipe: "STONE WASH MED", qty: 480, machine: "M-03", cycle: "42 min", status: "IN WASH" },
  { batch: "WSH-0839-04", po: "PO-2026-0839", recipe: "ENZYME LIGHT", qty: 520, machine: "M-01", cycle: "38 min", status: "DRYER" },
  { batch: "WSH-0847-02", po: "PO-2026-0847", recipe: "STONE WASH MED", qty: 480, machine: "M-05", cycle: "44 min", status: "QUEUED" },
  { batch: "WSH-0842-01", po: "PO-2026-0842", recipe: "BLEACH HEAVY", qty: 400, machine: "M-07", cycle: "55 min", status: "QC CHECK" },
  { batch: "WSH-0839-05", po: "PO-2026-0839", recipe: "ENZYME LIGHT", qty: 520, machine: "M-02", cycle: "36 min", status: "COMPLETED" },
];

const columns = [
  { key: "batch", header: "Batch" },
  { key: "po", header: "PO#" },
  { key: "recipe", header: "Recipe" },
  { key: "qty", header: "Qty", align: "right" as const },
  { key: "machine", header: "Machine" },
  { key: "cycle", header: "Cycle" },
  {
    key: "status",
    header: "Status",
    render: (val: string) => {
      const isAlert = val === "QC CHECK";
      const isDone = val === "COMPLETED";
      return (
        <span className={`px-2 py-0.5 text-[10px] font-display uppercase tracking-wider border ${
          isAlert ? "border-accent text-accent" : isDone ? "border-secondary text-secondary" : "border-primary text-primary"
        }`}>{val}</span>
      );
    },
  },
];

export default function WashPage() {
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-border">
        {kpis.map((kpi, i) => <KPICard key={i} {...kpi} />)}
      </div>
      <DataTable columns={columns} data={washBatches} title="Wash Batches" />
    </div>
  );
}
