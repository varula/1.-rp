import { KPICard } from "@/components/KPICard";
import { HorizontalBarChart } from "@/components/BarChart";
import { DataTable } from "@/components/DataTable";

const kpis = [
  { label: "Daily Output",       value: "2,847", unit: "pcs", trend: "up"   as const, subtext: "Target: 3,000" },
  { label: "OT Cost MTD",        value: "$18.4K", alert: true, trend: "up"  as const, subtext: "Budget: $15K" },
  { label: "Fabric Utilization", value: "87.3",  unit: "%",  trend: "down"  as const, subtext: "Target: 90%" },
  { label: "First Pass Yield",   value: "94.1",  unit: "%",  alert: true,             subtext: "QA Threshold: 95%" },
  { label: "WIP Inventory",      value: "12,450",unit: "pcs",                         subtext: "Across 6 modules" },
  { label: "On-Time Shipment",   value: "91.2",  unit: "%",  trend: "flat"  as const, subtext: "Target: 95%" },
];

const bottleneckData = [
  { label: "Store",    value: 95 },
  { label: "Cutting",  value: 88 },
  { label: "Sewing",   value: 72, alert: true },
  { label: "Wash",     value: 85 },
  { label: "Finishing",value: 90 },
  { label: "Ship",     value: 94 },
];

const otData = [
  { label: "Cutting",  value: 2400 },
  { label: "Sewing",   value: 8200, alert: true },
  { label: "Wash",     value: 3100 },
  { label: "Finishing",value: 2800 },
  { label: "QA",       value: 1900 },
];

const SANKEY = [
  { label: "Cut Panels",  pct: 95 },
  { label: "Sewn Units",  pct: 87 },
  { label: "Washed",      pct: 79 },
  { label: "Finished",    pct: 71 },
  { label: "Shipped",     pct: 63 },
];

const activeOrders = [
  { po: "PO-2026-0847", buyer: "LEVI'S",  style: "501-XX-RAW",    qty: 5000, status: "SEWING",    due: "22-MAR", progress: "68%" },
  { po: "PO-2026-0851", buyer: "GAP",     style: "SLIM-DARK",     qty: 3200, status: "CUTTING",   due: "28-MAR", progress: "32%" },
  { po: "PO-2026-0839", buyer: "H&M",     style: "WIDE-STONE",    qty: 8000, status: "WASH",      due: "18-MAR", progress: "81%" },
  { po: "PO-2026-0855", buyer: "UNIQLO",  style: "STRAIGHT-IND",  qty: 6000, status: "STORE",     due: "05-APR", progress: "12%" },
  { po: "PO-2026-0842", buyer: "ZARA",    style: "SKINNY-BLK",    qty: 4500, status: "FINISHING", due: "15-MAR", progress: "92%" },
];

const statusChip = (val: string) => {
  const cls =
    val === "SEWING"    ? "chip chip-alert"     :
    val === "CUTTING"   ? "chip chip-primary"   :
    val === "FINISHING" ? "chip chip-primary"   :
    "chip chip-secondary";
  return <span className={cls}>{val}</span>;
};

const orderColumns = [
  { key: "po",       header: "PO#" },
  { key: "buyer",    header: "Buyer" },
  { key: "style",    header: "Style" },
  { key: "qty",      header: "Qty",      align: "right" as const },
  { key: "status",   header: "Stage",    render: statusChip },
  { key: "due",      header: "Due" },
  { key: "progress", header: "Progress", align: "right" as const },
];

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">
      <h1 className="text-2xl font-semibold tracking-tight card-enter">Overview</h1>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((kpi, i) => (
          <KPICard key={i} {...kpi} delay={i * 60} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-4">
          <HorizontalBarChart data={bottleneckData} title="Line Efficiency by Module" unit="%" />
        </div>
        <div className="lg:col-span-4">
          <HorizontalBarChart data={otData} title="OT Cost by Dept (MTD)" unit="$" />
        </div>
        {/* Production Flow */}
        <div className="lg:col-span-4">
          <div className="grid-panel p-5 h-full flex flex-col">
            <span className="kpi-label mb-5">Production Flow</span>
            <div className="flex flex-col gap-4 flex-1 justify-center">
              {SANKEY.map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="bar-animated h-full rounded-full bg-primary/80"
                      style={{
                        "--bar-w": `${s.pct}%`,
                        animationDelay: `${200 + i * 100}ms`,
                      } as React.CSSProperties}
                    />
                  </div>
                  <div className="flex justify-between w-32 shrink-0 items-baseline">
                    <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">{s.label}</span>
                    <span className="text-sm font-bold text-foreground tabular-nums">{s.pct}%</span>
                  </div>
                </div>
              ))}
              <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground font-semibold uppercase tracking-widest">Total Shrinkage</span>
                <span className="text-sm font-bold text-accent tabular-nums">4.7%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Orders */}
      <DataTable columns={orderColumns} data={activeOrders} title="Active Production Orders" />
    </div>
  );
}
