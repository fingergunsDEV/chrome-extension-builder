
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import KeywordResearchTemplate from "./pages/templates/KeywordResearchTemplate";
import BacklinkAnalyzerTemplate from "./pages/templates/BacklinkAnalyzerTemplate";
import OnPageSEOTemplate from "./pages/templates/OnPageSEOTemplate";
import SERPAnalyzerTemplate from "./pages/templates/SERPAnalyzerTemplate";
import SchemaGeneratorTemplate from "./pages/templates/SchemaGeneratorTemplate";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Template routes */}
          <Route path="/templates/keyword-research" element={<KeywordResearchTemplate />} />
          <Route path="/templates/backlink-analyzer" element={<BacklinkAnalyzerTemplate />} />
          <Route path="/templates/on-page-seo" element={<OnPageSEOTemplate />} />
          <Route path="/templates/serp-analyzer" element={<SERPAnalyzerTemplate />} />
          <Route path="/templates/schema-generator" element={<SchemaGeneratorTemplate />} />
          
          {/* Placeholder routes for menu items */}
          <Route path="/settings" element={<NotFound />} />
          <Route path="/files" element={<NotFound />} />
          <Route path="/api" element={<NotFound />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
