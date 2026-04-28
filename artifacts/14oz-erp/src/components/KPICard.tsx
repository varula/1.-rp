import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

interface KPICardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down" | "flat";
  alert?: boolean;
  subtext?: string;
  delay?: number;
}

export function KPICard({ label, value, unit, trend, alert, subtext, delay = 0 }: KPICardProps) {
  return (
    <div
      className={`card-enter grid-panel p-5 flex flex-col justify-between min-h-[128px] cursor-default select-none ${
        alert
          ? "bg-amber-50/60 border-amber-200/60 dark:bg-amber-900/10 dark:border-amber-700/30"
          : ""
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <span className="kpi-label">{label}</span>
        {trend && (
          <div className={`p-1.5 rounded-full ${
            trend === "up"
              ? alert
                ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                : "bg-primary/10 text-primary"
              : trend === "down"
              ? "bg-destructive/10 text-destructive"
              : "bg-muted text-muted-foreground"
          }`}>
            {trend === "up"
              ? <ArrowUpRight className="w-3.5 h-3.5" />
              : trend === "down"
              ? <ArrowDownRight className="w-3.5 h-3.5" />
              : <Minus className="w-3.5 h-3.5" />}
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-col">
        <div className="flex items-baseline gap-1">
          <span className={`kpi-value ${alert ? "text-amber-600 dark:text-amber-400" : ""}`}>
            {value}
          </span>
          {unit && (
            <span className="text-sm text-muted-foreground font-medium ml-0.5">{unit}</span>
          )}
        </div>
        {subtext && (
          <span className="text-xs text-muted-foreground mt-1.5 font-medium">{subtext}</span>
        )}
      </div>
    </div>
  );
}
