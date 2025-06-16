import { Button } from "@/components/ui/button";
import { ServerStatusIndicator } from "@/components/ui/server-status";
import { Server } from "@/lib/types";

interface ServerStatusTableProps {
  servers: Server[];
  onConnect: (server: Server) => void;
}

export default function ServerStatusTable({ servers, onConnect }: ServerStatusTableProps) {
  return (
    <div className="bg-dark rounded-xl overflow-hidden shadow-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-dark-light">
              <th className="py-3 px-4 text-left font-technical text-sm text-light-dark">SERVER NAME</th>
              <th className="py-3 px-4 text-left font-technical text-sm text-light-dark">STATUS</th>
              <th className="py-3 px-4 text-left font-technical text-sm text-light-dark">IP ADDRESS</th>
              <th className="py-3 px-4 text-left font-technical text-sm text-light-dark">PLAYERS</th>
              <th className="py-3 px-4 text-left font-technical text-sm text-light-dark">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-light">
            {servers.map((server) => (
              <tr key={server.id} className="hover:bg-dark-light/30 transition-colors">
                <td className="py-3 px-4 font-technical">{server.name}</td>
                <td className="py-3 px-4">
                  <ServerStatusIndicator status={server.status as any} />
                </td>
                <td className="py-3 px-4 font-technical text-sm text-light-dark/80">{server.ipAddress}:{server.port}</td>
                <td className="py-3 px-4 font-technical">{server.currentPlayers}/{server.maxPlayers}</td>
                <td className="py-3 px-4">
                  {server.status === "online" ? (
                    <Button 
                      size="sm"
                      onClick={() => onConnect(server)}
                      className="bg-primary hover:bg-primary-dark text-white"
                    >
                      Connect
                    </Button>
                  ) : (
                    <Button 
                      size="sm"
                      disabled
                      className="bg-gray-400 cursor-not-allowed text-white"
                    >
                      Offline
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
