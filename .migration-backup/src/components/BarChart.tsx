interface BarChartProps {
  data: { label: string; value: number; max?: number; alert?: boolean }[];
  title: string;
  unit?: string;
}

export function HorizontalBarChart({ data, title, unit }: BarChartProps) {
  const maxVal = Math.max(...data.map(d => d.max || d.value));

  return (
    <div className="grid-panel p-4">
      <span className="kpi-label">{title}</span>
      <div className="mt-3 space-y-2">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="font-display text-[10px] uppercase tracking-wider text-muted-foreground w-20 text-right shrink-0">
              {item.label}
            </span>
            <div className="flex-1 h-4 bg-muted relative">
              <div
                className={`h-full transition-all duration-500 ${item.alert ? "bg-accent" : "bg-secondary"}`}
                style={{ width: `${(item.value / maxVal) * 100}%` }}
              />
            </div>
            <span className={`font-data text-xs w-16 text-right ${item.alert ? "status-alert" : "text-foreground"}`}>
              {item.value}{unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
