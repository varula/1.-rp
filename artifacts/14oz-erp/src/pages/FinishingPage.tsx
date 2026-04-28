import { KPICard } from "@/components/KPICard";
import { DataTable } from "@/components/DataTable";

const kpis = [
  { label: "Daily Packed", value: "2,650", unit: "pcs", subtext: "Target: 2,800" },
  { label: "QA Rejection", value: "2.4", unit: "%", subtext: "Target: <2%" },
  { label: "Pending Press", value: "1,200", unit: "pcs" },
  { label: "Cartons Sealed", value: "145", subtext: "Today" },
];

const finishingData = [
  { ticket: "FIN-0842-01", po: "PO-2026-0842", style: "SKINNY-BLK", qty: 450, stage: "PRESSING", qaPassed: "98%", packed: 0 },
  { ticket: "FIN-0839-03", po: "PO-2026-0839", style: "WIDE-STONE", qty: 520, stage: "TAGGING", qaPassed: "96%", packed: 0 },
  { ticket: "FIN-0839-02", po: "PO-2026-0839", style: "WIDE-STONE", qty: 500, stage: "PACKING", qaPassed: "97%", packed: 380 },
  { ticket: "FIN-0847-01", po: "PO-2026-0847", style: "501-XX-RAW", qty: 480, stage: "FINAL QA", qaPassed: "91%", packed: 0 },
  { ticket: "FIN-0842-02", po: "PO-2026-0842", style: "SKINNY-BLK", qty: 440, stage: "CARTON SEAL", qaPassed: "99%", packed: 440 },
];

const columns = [
  { key: "ticket", header: "Ticket" },
  { key: "po", header: "PO#" },
  { key: "style", header: "Style" },
  { key: "qty", header: "Qty", align: "right" as const },
  {
    key: "stage",
    header: "Stage",
    render: (val: string) => {
      const isQA = val === "FINAL QA";
      return (
        <span className={`chip ${
          isQA ? "chip-alert" : "chip-secondary"
        }`}>{val}</span>
      );
    },
  },
  {
    key: "qaPassed",
    header: "QA Pass",
    align: "right" as const,
    render: (val: string) => {
      const num = parseFloat(val);
      return <span className={num < 95 ? "text-accent font-semibold" : "text-muted-foreground"}>{val}</span>;
    },
  },
  { key: "packed", header: "Packed", align: "right" as const },
];

export default function FinishingPage() {
  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Finishing</h1>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => <KPICard key={i} {...kpi} />)}
      </div>
      <DataTable columns={columns} data={finishingData} title="Finishing Pipeline" />
    </div>
  );
}
