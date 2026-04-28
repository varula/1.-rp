interface BarChartProps {
  data: { label: string; value: number; max?: number; alert?: boolean }[];
  title: string;
  unit?: string;
}

export function HorizontalBarChart({ data, title, unit }: BarChartProps) {
  const maxVal = Math.max(...data.map(d => d.max || d.value));

  return (
    <div className="grid-panel p-5 h-full flex flex-col">
      <span className="kpi-label">{title}</span>
      <div className="mt-5 space-y-3.5 flex-1 flex flex-col justify-center">
        {data.map((item, i) => {
          const pct = (item.value / maxVal) * 100;
          return (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xs font-medium text-muted-foreground w-20 text-right shrink-0">
                {item.label}
              </span>
              <div className="flex-1 h-2 bg-secondary dark:bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bar-animated ${item.alert ? "bg-accent" : "bg-primary"}`}
                  style={{
                    "--bar-w": `${pct}%`,
                    animationDelay: `${i * 80}ms`,
                  } as React.CSSProperties}
                />
              </div>
              <span className={`text-sm font-semibold w-16 text-right tabular-nums ${item.alert ? "text-accent" : "text-foreground"}`}>
                {item.value}{unit}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
