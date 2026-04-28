import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import {
  Warehouse, Scissors, Cog, Droplets, Package, Truck,
  LayoutDashboard, ClipboardCheck, Briefcase,
  Sun, Moon, Printer, Maximize2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MODULES = [
  { id: "dashboard", label: "Dashboard", path: "/",             icon: LayoutDashboard },
  { id: "store",     label: "Store",     path: "/store",        icon: Warehouse },
  { id: "cutting",   label: "Cutting",   path: "/cutting",      icon: Scissors },
  { id: "sewing",    label: "Sewing",    path: "/sewing",       icon: Cog },
  { id: "wash",      label: "Wash",      path: "/wash",         icon: Droplets },
  { id: "quality",   label: "Quality",   path: "/quality",      icon: ClipboardCheck },
  { id: "finishing", label: "Finishing", path: "/finishing",    icon: Package },
  { id: "merch",     label: "Merch",     path: "/merchandising",icon: Briefcase },
  { id: "shipment",  label: "Shipment",  path: "/shipment",     icon: Truck },
];

export function ProductionTimeline() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handlePrint = () => window.print();

  const handlePresentation = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <nav className="glass-nav sticky top-0 z-50 w-full no-print">
      <div className="flex items-center px-5 h-14 gap-2">
        {/* Brand */}
        <div className="flex items-baseline mr-6 shrink-0">
          <span className="font-bold text-[18px] tracking-tight text-foreground">14oz</span>
          <span className="text-[11px] text-muted-foreground ml-1.5 font-semibold tracking-widest uppercase">ERP</span>
        </div>

        {/* Nav pills */}
        <div className="flex flex-1 items-center gap-0.5 overflow-x-auto scrollbar-none">
          {MODULES.map((mod) => {
            const isActive = location.pathname === mod.path;
            const Icon = mod.icon;
            return (
              <button
                key={mod.id}
                onClick={() => navigate(mod.path)}
                className={`
                  relative flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium
                  rounded-full whitespace-nowrap transition-colors duration-150
                  ${isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                  }
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="nav-pill-active absolute inset-0 rounded-full"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5" />
                  {mod.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-1 ml-2 shrink-0">
          {/* Dark/light toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 45, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </motion.span>
              </AnimatePresence>
            </button>
          )}

          {/* PDF export */}
          <button
            onClick={handlePrint}
            className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            title="Export to PDF"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Presentation mode */}
          <button
            onClick={handlePresentation}
            className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            title="Presentation mode"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Live clock */}
          <div className="ml-2 pl-3 border-l border-border">
            <LiveClock />
          </div>
        </div>
      </div>
    </nav>
  );
}

function LiveClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className="text-right">
      <div className="text-sm font-semibold text-foreground tabular-nums">{time}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{date}</div>
    </div>
  );
}
