import { KPICard } from "@/components/KPICard";
import { DataTable } from "@/components/DataTable";
import { HorizontalBarChart } from "@/components/BarChart";

const kpis = [
  { label: "Lines Active", value: "12/14", subtext: "2 lines on OT" },
  { label: "DHU Rate", value: "6.8", unit: "%", alert: true, subtext: "Target: <5%" },
  { label: "Hourly Output", value: "148", unit: "pcs/hr", trend: "down" as const },
  { label: "OT Hours Today", value: "42", unit: "hrs", alert: true, subtext: "Budget: 30 hrs" },
];

const lineData = [
  { line: "LINE-01", style: "501-XX-RAW", target: 400, actual: 385, efficiency: "96%", dhu: "4.2%", ot: "2h" },
  { line: "LINE-02", style: "501-XX-RAW", target: 400, actual: 310, efficiency: "78%", dhu: "8.1%", ot: "4h" },
  { line: "LINE-03", style: "SLIM-DARK", target: 350, actual: 342, efficiency: "98%", dhu: "3.5%", ot: "0h" },
  { line: "LINE-04", style: "WIDE-STONE", target: 380, actual: 295, efficiency: "78%", dhu: "9.2%", ot: "6h" },
  { line: "LINE-05", style: "SLIM-DARK", target: 350, actual: 348, efficiency: "99%", dhu: "2.8%", ot: "0h" },
  { line: "LINE-06", style: "WIDE-STONE", target: 380, actual: 361, efficiency: "95%", dhu: "4.6%", ot: "1h" },
];

const columns = [
  { key: "line", header: "Line" },
  { key: "style", header: "Style" },
  { key: "target", header: "Target", align: "right" as const },
  { key: "actual", header: "Actual", align: "right" as const },
  {
    key: "efficiency",
    header: "Eff%",
    align: "right" as const,
    render: (val: string) => {
      const num = parseFloat(val);
      return <span className={num < 85 ? "status-alert" : "status-nominal"}>{val}</span>;
    },
  },
  {
    key: "dhu",
    header: "DHU%",
    align: "right" as const,
    render: (val: string) => {
      const num = parseFloat(val);
      return <span className={num > 5 ? "status-alert" : "status-nominal"}>{val}</span>;
    },
  },
  { key: "ot", header: "OT" },
];

const efficiencyData = [
  { label: "LINE-01", value: 96 },
  { label: "LINE-02", value: 78, alert: true },
  { label: "LINE-03", value: 98 },
  { label: "LINE-04", value: 78, alert: true },
  { label: "LINE-05", value: 99 },
  { label: "LINE-06", value: 95 },
];

export default function SewingPage() {
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-border">
        {kpis.map((kpi, i) => <KPICard key={i} {...kpi} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[1px] bg-border">
        <div className="lg:col-span-8">
          <DataTable columns={columns} data={lineData} title="Sewing Line Performance" />
        </div>
        <div className="lg:col-span-4">
          <HorizontalBarChart data={efficiencyData} title="Line Efficiency %" unit="%" />
        </div>
      </div>
    </div>
  );
}
