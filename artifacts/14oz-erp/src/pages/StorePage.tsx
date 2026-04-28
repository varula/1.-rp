import { KPICard } from "@/components/KPICard";
import { DataTable } from "@/components/DataTable";
import { HorizontalBarChart } from "@/components/BarChart";

const kpis = [
  { label: "Total Fabric Stock", value: "142,500", unit: "yds" },
  { label: "Rolls in Store", value: "385", subtext: "Across 12 lots" },
  { label: "Avg Roll Width", value: "58.2", unit: "in" },
  { label: "Pending GRN", value: "8", alert: true, subtext: "3 overdue" },
];

const inventory = [
  { lot: "LOT-2026-041", fabric: "14oz RAW SELVEDGE", supplier: "KURABO", rolls: 42, yardage: "15,400", width: "58\"", status: "AVAILABLE" },
  { lot: "LOT-2026-038", fabric: "12oz STRETCH INDIGO", supplier: "ISKO", rolls: 28, yardage: "10,200", width: "60\"", status: "RESERVED" },
  { lot: "LOT-2026-044", fabric: "10oz CHAMBRAY", supplier: "ARVIND", rolls: 15, yardage: "5,800", width: "56\"", status: "QC HOLD" },
  { lot: "LOT-2026-039", fabric: "13oz ROPE DYED", supplier: "CONE", rolls: 55, yardage: "20,100", width: "59\"", status: "AVAILABLE" },
  { lot: "LOT-2026-046", fabric: "11oz CROSSHATCH", supplier: "TAVEX", rolls: 33, yardage: "12,000", width: "57\"", status: "INCOMING" },
];

const columns = [
  { key: "lot", header: "Lot #" },
  { key: "fabric", header: "Fabric" },
  { key: "supplier", header: "Supplier" },
  { key: "rolls", header: "Rolls", align: "right" as const },
  { key: "yardage", header: "Yardage", align: "right" as const },
  { key: "width", header: "Width" },
  {
    key: "status",
    header: "Status",
    render: (val: string) => {
      const isAlert = val === "QC HOLD" || val === "INCOMING";
      return (
        <span className={`chip ${
          isAlert ? "chip-alert" : "chip-secondary"
        }`}>{val}</span>
      );
    },
  },
];

const utilizationData = [
  { label: "14oz RAW", value: 92 },
  { label: "12oz STR", value: 78 },
  { label: "10oz CHM", value: 45, alert: true },
  { label: "13oz ROPE", value: 88 },
  { label: "11oz XHTCH", value: 65 },
];

export default function StorePage() {
  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Store</h1>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => <KPICard key={i} {...kpi} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <DataTable columns={columns} data={inventory} title="Fabric Inventory" />
        </div>
        <div className="lg:col-span-4">
          <HorizontalBarChart data={utilizationData} title="Fabric Utilization by Type" unit="%" />
        </div>
      </div>
    </div>
  );
}
