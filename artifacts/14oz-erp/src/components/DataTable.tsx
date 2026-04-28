interface Column {
  key: string;
  header: string;
  align?: "left" | "right" | "center";
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  title?: string;
}

export function DataTable({ columns, data, title }: DataTableProps) {
  return (
    <div className="grid-panel overflow-hidden">
      {title && (
        <div className="px-5 py-4 border-b border-border">
          <span className="kpi-label">{title}</span>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[580px]">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap ${
                    col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr
                key={`${row.id ?? row.po ?? row.ticket ?? row.batch ?? row.shipId ?? row.lot ?? "row"}-${i}`}
                className="row-enter border-b border-border/50 hover:bg-muted/30 transition-colors"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-5 py-3.5 text-sm ${
                      col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"
                    }`}
                  >
                    {col.render ? col.render(row[col.key] ?? "", row) : (
                      <span className="text-foreground/90 font-medium tabular-nums">{row[col.key] ?? "—"}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
