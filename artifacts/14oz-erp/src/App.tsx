import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProductionTimeline } from "@/components/ProductionTimeline";
import Dashboard from "./pages/Dashboard";
import StorePage from "./pages/StorePage";
import CuttingPage from "./pages/CuttingPage";
import SewingPage from "./pages/SewingPage";
import WashPage from "./pages/WashPage";
import QualityPage from "./pages/QualityPage";
import FinishingPage from "./pages/FinishingPage";
import MerchandisingPage from "./pages/MerchandisingPage";
import ShipmentPage from "./pages/ShipmentPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={base}>
          <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
            <ProductionTimeline />
            <main className="flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/store" element={<StorePage />} />
                <Route path="/cutting" element={<CuttingPage />} />
                <Route path="/sewing" element={<SewingPage />} />
                <Route path="/wash" element={<WashPage />} />
                <Route path="/quality" element={<QualityPage />} />
                <Route path="/finishing" element={<FinishingPage />} />
                <Route path="/merchandising" element={<MerchandisingPage />} />
                <Route path="/shipment" element={<ShipmentPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
