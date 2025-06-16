import { motion } from "framer-motion";
import { ServerStatusIndicator } from "@/components/ui/server-status";
import { Button } from "@/components/ui/button";
import { Server } from "@/lib/types";

interface ServerCardProps {
  server: Server;
  onConnect: (server: Server) => void;
}

export default function ServerCard({ server, onConnect }: ServerCardProps) {
  const daysSinceWipe = server.lastWipe 
    ? Math.floor((new Date().getTime() - new Date(server.lastWipe).getTime()) / (1000 * 3600 * 24))
    : null;
    
  const formattedDaysSinceWipe = daysSinceWipe !== null 
    ? daysSinceWipe === 0 
      ? "today"
      : daysSinceWipe === 1 
        ? "yesterday" 
        : `${daysSinceWipe} days ago`
    : "unknown";
  
  return (
    <motion.div 
      className="bg-dark rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative">
        <img 
          src={server.imageUrl} 
          alt={server.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <ServerStatusIndicator status={server.status as any} />
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-heading text-2xl text-primary mb-2">{server.name}</h3>
        <p className="text-light-dark mb-4">{server.description}</p>
        
        <div className="flex justify-between mb-4">
          <div className="text-center">
            <p className="text-xs text-light-dark/70 font-technical">PLAYERS</p>
            <p className="font-technical font-bold text-accent">{server.currentPlayers}/{server.maxPlayers}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-light-dark/70 font-technical">MAP SIZE</p>
            <p className="font-technical font-bold text-accent">{server.mapSize}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-light-dark/70 font-technical">LAST WIPE</p>
            <p className="font-technical font-bold text-accent">{formattedDaysSinceWipe}</p>
          </div>
        </div>
        
        {server.status === "online" ? (
          <Button 
            onClick={() => onConnect(server)}
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold"
          >
            Connect to Server
          </Button>
        ) : (
          <Button 
            disabled
            className="w-full bg-gray-600 cursor-not-allowed text-white font-bold"
          >
            {server.status === "maintenance" ? "Server in Maintenance" : "Server Offline"}
          </Button>
        )}
      </div>
    </motion.div>
  );
}
