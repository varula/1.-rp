import { KPICard } from "@/components/KPICard";
import { HorizontalBarChart } from "@/components/BarChart";
import { DataTable } from "@/components/DataTable";

const kpis = [
  { label: "Daily Output", value: "2,847", unit: "pcs", trend: "up" as const, subtext: "Target: 3,000" },
  { label: "OT Cost MTD", value: "$18.4K", alert: true, trend: "up" as const, subtext: "Budget: $15K" },
  { label: "Fabric Utilization", value: "87.3", unit: "%", trend: "down" as const, subtext: "Target: 90%" },
  { label: "First Pass Yield", value: "94.1", unit: "%", subtext: "QA Threshold: 95%", alert: true },
  { label: "WIP Inventory", value: "12,450", unit: "pcs", subtext: "Across 6 modules" },
  { label: "On-Time Shipment", value: "91.2", unit: "%", trend: "flat" as const, subtext: "Target: 95%" },
];

const bottleneckData = [
  { label: "Store", value: 95 },
  { label: "Cutting", value: 88 },
  { label: "Sewing", value: 72, alert: true },
  { label: "Wash", value: 85 },
  { label: "Finishing", value: 90 },
  { label: "Ship", value: 94 },
];

const otData = [
  { label: "Cutting", value: 2400 },
  { label: "Sewing", value: 8200, alert: true },
  { label: "Wash", value: 3100 },
  { label: "Finishing", value: 2800 },
  { label: "QA", value: 1900 },
];

const activeOrders = [
  { po: "PO-2026-0847", buyer: "LEVI'S", style: "501-XX-RAW", qty: 5000, status: "SEWING", due: "22-MAR", progress: "68%" },
  { po: "PO-2026-0851", buyer: "GAP", style: "SLIM-DARK", qty: 3200, status: "CUTTING", due: "28-MAR", progress: "32%" },
  { po: "PO-2026-0839", buyer: "H&M", style: "WIDE-STONE", qty: 8000, status: "WASH", due: "18-MAR", progress: "81%" },
  { po: "PO-2026-0855", buyer: "UNIQLO", style: "STRAIGHT-IND", qty: 6000, status: "STORE", due: "05-APR", progress: "12%" },
  { po: "PO-2026-0842", buyer: "ZARA", style: "SKINNY-BLK", qty: 4500, status: "FINISHING", due: "15-MAR", progress: "92%" },
];

const orderColumns = [
  { key: "po", header: "PO#" },
  { key: "buyer", header: "Buyer" },
  { key: "style", header: "Style" },
  { key: "qty", header: "Qty", align: "right" as const },
  {
    key: "status",
    header: "Stage",
    render: (val: string) => (
      <span className={`px-2 py-0.5 text-[10px] font-display uppercase tracking-wider border ${
        val === "SEWING" ? "border-accent text-accent" : "border-secondary text-secondary"
      }`}>
        {val}
      </span>
    ),
  },
  { key: "due", header: "Due" },
  { key: "progress", header: "Progress", align: "right" as const },
];

export default function Dashboard() {
  return (
    <div className="p-4 space-y-4">
      {/* Section: KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[1px] bg-border">
        {kpis.map((kpi, i) => (
          <KPICard key={i} {...kpi} />
        ))}
      </div>

      {/* Section: Charts + Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[1px] bg-border">
        <div className="lg:col-span-4">
          <HorizontalBarChart data={bottleneckData} title="Line Efficiency by Module" unit="%" />
        </div>
        <div className="lg:col-span-4">
          <HorizontalBarChart data={otData} title="OT Cost by Dept (MTD)" unit="$" />
        </div>
        <div className="lg:col-span-4">
          <div className="grid-panel p-4 h-full">
            <span className="kpi-label">Production Flow — Sankey</span>
            <div className="mt-4 flex flex-col gap-1">
              {["RAW FABRIC → CUT PANELS", "CUT PANELS → SEWN UNITS", "SEWN UNITS → WASHED", "WASHED → FINISHED", "FINISHED → SHIPPED"].map((flow, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex-1 h-3 bg-muted relative overflow-hidden">
                    <div
                      className="h-full bg-secondary"
                      style={{ width: `${95 - i * 8}%` }}
                    />
                  </div>
                  <span className="font-data text-[10px] text-muted-foreground w-32">{flow}</span>
                  <span className="font-data text-[10px] text-foreground w-8 text-right">{95 - i * 8}%</span>
                </div>
              ))}
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground font-display uppercase tracking-wider">Total Shrinkage/Waste</span>
                <span className="font-data text-xs status-alert">4.7%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Active Orders */}
      <DataTable columns={orderColumns} data={activeOrders} title="Active Production Orders" />
    </div>
  );
}
