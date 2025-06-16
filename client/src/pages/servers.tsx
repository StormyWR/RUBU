import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import ServerCard from "@/components/servers/ServerCard";
import ServerStatusTable from "@/components/servers/ServerStatusTable";
import { Server } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle } from "lucide-react";

export default function Servers() {
  const { toast } = useToast();
  const { data: servers, isLoading, error } = useQuery<Server[]>({
    queryKey: ['/api/servers'],
  });
  
  const handleConnectToServer = (server: Server) => {
    // In a real-world scenario, this might launch the game
    // or provide instructions for connecting
    toast({
      title: "Connecting to server",
      description: `Launching Rust to connect to ${server.name}`,
    });
    
    // Create a clipboard copy of the server connect command
    const connectCommand = `client.connect ${server.ipAddress}:${server.port}`;
    navigator.clipboard.writeText(connectCommand)
      .then(() => {
        toast({
          title: "Connect command copied!",
          description: "Paste in Rust console (F1) to connect",
        });
      })
      .catch(err => {
        console.error("Could not copy text: ", err);
      });
  };
  
  if (isLoading) {
    return (
      <div className="py-12 md:py-20 container mx-auto px-4 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error || !servers) {
    return (
      <div className="py-12 md:py-20 container mx-auto px-4">
        <div className="bg-dark p-6 rounded-xl flex items-center justify-center space-x-3">
          <AlertTriangle className="text-secondary h-6 w-6" />
          <p className="text-light-dark">Failed to load server information. Please try again later.</p>
        </div>
      </div>
    );
  }
  
  return (
    <motion.section 
      className="py-12 md:py-20 bg-dark/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-4xl md:text-5xl text-primary text-center mb-12">Our Servers</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servers.map((server) => (
            <ServerCard 
              key={server.id} 
              server={server} 
              onConnect={handleConnectToServer} 
            />
          ))}
        </div>
        
        {/* Server statuses */}
        <div className="mt-12 md:mt-20">
          <h3 className="font-heading text-2xl md:text-3xl text-primary text-center mb-8">Live Server Status</h3>
          <ServerStatusTable 
            servers={servers} 
            onConnect={handleConnectToServer} 
          />
        </div>
      </div>
    </motion.section>
  );
}
