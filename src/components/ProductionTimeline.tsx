import { useLocation, useNavigate } from "react-router-dom";
import { Warehouse, Scissors, Cog, Droplets, Package, Truck, LayoutDashboard } from "lucide-react";

const modules = [
  { id: "dashboard", label: "DASHBOARD", path: "/", icon: LayoutDashboard },
  { id: "store", label: "STORE", path: "/store", icon: Warehouse },
  { id: "cutting", label: "CUTTING", path: "/cutting", icon: Scissors },
  { id: "sewing", label: "SEWING", path: "/sewing", icon: Cog },
  { id: "wash", label: "WASH", path: "/wash", icon: Droplets },
  { id: "finishing", label: "FINISHING", path: "/finishing", icon: Package },
  { id: "shipment", label: "SHIP", path: "/shipment", icon: Truck },
];

export function ProductionTimeline() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="w-full border-b border-border bg-card">
      <div className="flex items-stretch">
        {/* Brand */}
        <div className="flex items-center px-6 border-r border-border">
          <span className="font-display font-black text-lg tracking-tight text-primary">
            14oz
          </span>
          <span className="font-display text-xs text-muted-foreground ml-2 tracking-widest uppercase">
            ERP
          </span>
        </div>

        {/* Timeline modules */}
        <div className="flex flex-1 items-stretch overflow-x-auto">
          {modules.map((mod, i) => {
            const isActive = location.pathname === mod.path;
            const Icon = mod.icon;
            return (
              <button
                key={mod.id}
                onClick={() => navigate(mod.path)}
                className={`
                  flex items-center gap-2 px-5 py-3 font-display text-xs font-semibold tracking-widest uppercase
                  border-r border-border transition-colors duration-100 whitespace-nowrap
                  ${isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {mod.label}
                {i < modules.length - 1 && !isActive && (
                  <span className="ml-2 text-primary opacity-40">→</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Clock / Meta */}
        <div className="flex items-center px-4 border-l border-border text-muted-foreground">
          <LiveClock />
        </div>
      </div>
    </nav>
  );
}

function LiveClock() {
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
  return (
    <div className="font-data text-xs text-right">
      <div className="text-foreground">{time}</div>
      <div className="text-muted-foreground">{date}</div>
    </div>
  );
}
