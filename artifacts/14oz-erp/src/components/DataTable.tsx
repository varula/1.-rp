import { useState } from "react";

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

function TableRow({ row, columns }: { row: any; columns: Column[] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <tr
      className={`border-b border-border/30 transition-colors ${hovered ? "bg-muted/40" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {columns.map((col) => (
        <td
          key={col.key}
          className={`px-4 py-2 ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"}`}
        >
          {col.render ? col.render(row[col.key] ?? "", row) : (row[col.key] ?? "—")}
        </td>
      ))}
    </tr>
  );
}

export function DataTable({ columns, data, title }: DataTableProps) {
  return (
    <div className="grid-panel">
      {title && (
        <div className="px-4 py-2 border-b border-border">
          <span className="kpi-label">{title}</span>
        </div>
      )}
      <div className="overflow-x-auto" style={{ minWidth: 0 }}>
        <table className="w-full font-data text-xs" style={{ minWidth: 600 }}>
          <thead>
            <tr className="border-b border-border">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-2 font-display font-semibold text-[10px] uppercase tracking-widest text-muted-foreground ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <TableRow key={row.id ?? row.po ?? row.ticket ?? row.batch ?? row.shipId ?? row.lot ?? i} row={row} columns={columns} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
