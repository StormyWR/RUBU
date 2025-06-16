import { Badge } from "@/components/ui/badge";

type ServerStatus = "online" | "offline" | "maintenance";

interface ServerStatusIndicatorProps {
  status: ServerStatus;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export function ServerStatusIndicator({ 
  status, 
  showLabel = true,
  size = "md"
}: ServerStatusIndicatorProps) {
  const statusConfig = {
    online: {
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      textColor: "text-green-800",
      bgColor: "bg-green-100",
      label: "Online"
    },
    offline: {
      color: "bg-red-500",
      hoverColor: "hover:bg-red-600",
      textColor: "text-red-800",
      bgColor: "bg-red-100",
      label: "Offline"
    },
    maintenance: {
      color: "bg-yellow-500",
      hoverColor: "hover:bg-yellow-600",
      textColor: "text-yellow-800",
      bgColor: "bg-yellow-100",
      label: "Maintenance"
    }
  };
  
  const config = statusConfig[status];
  
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-xs px-2.5 py-0.5",
    lg: "text-sm px-3 py-1"
  };
  
  return (
    <Badge 
      className={`
        inline-flex items-center rounded-full font-medium 
        ${config.bgColor} ${config.textColor} ${sizeClasses[size]}
      `}
    >
      {/* Pulsing dot */}
      <span className={`w-2 h-2 ${config.color} rounded-full mr-1 ${status === 'online' ? 'animate-pulse' : ''}`}></span>
      {showLabel && config.label}
    </Badge>
  );
}

interface ServerStatusTableCellProps {
  status: ServerStatus;
}

export function ServerStatusTableCell({ status }: ServerStatusTableCellProps) {
  return (
    <div className="py-3 px-4">
      <ServerStatusIndicator status={status} />
    </div>
  );
}
