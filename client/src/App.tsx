import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Servers from "@/pages/servers";
import Wipe from "@/pages/wipe";
import Store from "@/pages/store";
import LinkAccount from "@/pages/link-account";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/layout/CookieConsent";
import { useState, useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/servers" component={Servers} />
      <Route path="/wipe" component={Wipe} />
      <Route path="/store" component={Store} />
      <Route path="/link-account" component={LinkAccount} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [cookieChoice, setCookieChoice] = useState<string | null>(null);

  useEffect(() => {
    const storedChoice = localStorage.getItem("cookieChoice");
    setCookieChoice(storedChoice);
  }, []);

  const handleCookieChoice = (choice: string) => {
    localStorage.setItem("cookieChoice", choice);
    setCookieChoice(choice);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-dark bg-pattern bandana-overlay font-body text-light">
        <Header />
        <main className="flex-grow flex flex-col">
          <Router />
        </main>
        <Footer />
        {!cookieChoice && (
          <CookieConsent 
            onAccept={() => handleCookieChoice("accepted")} 
            onDecline={() => handleCookieChoice("declined")} 
          />
        )}
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
