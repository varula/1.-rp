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
    <div className="grid-panel">
      {title && (
        <div className="px-4 py-2 border-b border-border">
          <span className="kpi-label">{title}</span>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full font-data text-xs">
          <thead>
            <tr className="border-b border-border">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-2 font-display font-semibold text-[10px] uppercase tracking-widest text-muted-foreground text-${col.align || "left"}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-2 text-${col.align || "left"}`}
                  >
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
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
