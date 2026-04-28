import { KPICard } from "@/components/KPICard";
import { DataTable } from "@/components/DataTable";
import { HorizontalBarChart } from "@/components/BarChart";

const KPIS = [
  { label: "First Pass Yield", value: "94.1", unit: "%", alert: true, subtext: "Target: 95%" },
  { label: "DHU Rate (Avg)", value: "5.4", unit: "%", alert: true, subtext: "Target: <5%" },
  { label: "Inspections Today", value: "18", subtext: "6 pending" },
  { label: "Rejections MTD", value: "342", unit: "pcs", trend: "up" as const, subtext: "vs 280 last month" },
];

const QC_RECORDS = [
  { id: "QC-0847-01", po: "PO-2026-0847", stage: "INLINE", inspected: 480, passed: 456, failed: 24, dhu: "5.0%", result: "CONDITIONAL", inspector: "M. HASSAN" },
  { id: "QC-0839-03", po: "PO-2026-0839", stage: "END-LINE", inspected: 520, passed: 507, failed: 13, dhu: "2.5%", result: "PASS", inspector: "A. KHAN" },
  { id: "QC-0842-02", po: "PO-2026-0842", stage: "FINAL AQL", inspected: 200, passed: 195, failed: 5, dhu: "2.5%", result: "PASS", inspector: "S. AHMED" },
  { id: "QC-0855-01", po: "PO-2026-0855", stage: "INLINE", inspected: 380, passed: 342, failed: 38, dhu: "10.0%", result: "FAIL", inspector: "R. IQBAL" },
  { id: "QC-0851-01", po: "PO-2026-0851", stage: "PRE-WASH", inspected: 600, passed: 582, failed: 18, dhu: "3.0%", result: "PASS", inspector: "T. ALI" },
  { id: "QC-0847-02", po: "PO-2026-0847", stage: "POST-WASH", inspected: 460, passed: 430, failed: 30, dhu: "6.5%", result: "CONDITIONAL", inspector: "M. HASSAN" },
];

const COLUMNS = [
  { key: "id", header: "QC ID" },
  { key: "po", header: "PO#" },
  {
    key: "stage",
    header: "Stage",
    render: (val: string) => (
      <span className="chip chip-secondary">
        {val}
      </span>
    ),
  },
  { key: "inspected", header: "Inspected", align: "right" as const },
  { key: "passed", header: "Passed", align: "right" as const },
  { key: "failed", header: "Failed", align: "right" as const },
  {
    key: "dhu",
    header: "DHU%",
    align: "right" as const,
    render: (val: string) => {
      const num = parseFloat(val ?? "0");
      return <span className={num > 5 ? "text-accent font-semibold" : "text-muted-foreground"}>{val}</span>;
    },
  },
  {
    key: "result",
    header: "Result",
    render: (val: string) => {
      const isFail = val === "FAIL";
      const isConditional = val === "CONDITIONAL";
      return (
        <span className={`chip ${
          isFail ? "chip-alert" : isConditional ? "chip-primary" : "chip-secondary"
        }`}>{val}</span>
      );
    },
  },
  { key: "inspector", header: "Inspector" },
];

const DEFECT_DATA = [
  { label: "Broken Stitch", value: 28, alert: true },
  { label: "Skip Stitch", value: 22, alert: true },
  { label: "Puckering", value: 15 },
  { label: "Oil Stain", value: 12 },
  { label: "Shade Variation", value: 8 },
  { label: "Measurement", value: 6 },
];

export default function QualityPage() {
  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Quality Control</h1>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPIS.map((kpi, i) => <KPICard key={i} {...kpi} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <DataTable columns={COLUMNS} data={QC_RECORDS} title="QC Inspection Records" />
        </div>
        <div className="lg:col-span-4">
          <HorizontalBarChart data={DEFECT_DATA} title="Top Defects (This Week)" unit=" pcs" />
        </div>
      </div>
    </div>
  );
}
