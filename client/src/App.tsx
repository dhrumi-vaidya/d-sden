import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/landing";
import TerminalPage from "@/pages/terminal-view";
import RecruiterView from "@/views/RecruiterView";
import NonTechView from "@/views/NonTechView";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/recruiter" component={RecruiterView} />
      <Route path="/non-tech" component={NonTechView} />
      <Route path="/terminal" component={TerminalPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
