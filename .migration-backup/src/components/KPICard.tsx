interface KPICardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down" | "flat";
  alert?: boolean;
  subtext?: string;
}

export function KPICard({ label, value, unit, trend, alert, subtext }: KPICardProps) {
  return (
    <div className="grid-panel p-4 flex flex-col justify-between min-h-[100px]">
      <span className="kpi-label">{label}</span>
      <div className="mt-2 flex items-baseline gap-1">
        <span className={`kpi-value ${alert ? "status-alert" : "text-foreground"}`}>
          {value}
        </span>
        {unit && <span className="text-xs text-muted-foreground font-data">{unit}</span>}
        {trend && (
          <span className={`text-xs ml-1 ${trend === "up" ? "status-alert" : "status-nominal"}`}>
            {trend === "up" ? "▲" : trend === "down" ? "▼" : "─"}
          </span>
        )}
      </div>
      {subtext && <span className="text-[10px] text-muted-foreground mt-1 font-data">{subtext}</span>}
    </div>
  );
}
