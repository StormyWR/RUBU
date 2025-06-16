import { motion } from "framer-motion";
import { Server, WipeSchedule } from "@/lib/types";

interface WipeScheduleCardProps {
  servers: Server[];
  wipeSchedules: WipeSchedule[];
}

export default function WipeScheduleCard({ servers, wipeSchedules }: WipeScheduleCardProps) {
  // Helper function to get server name by ID
  const getServerName = (serverId: number): string => {
    const server = servers.find(s => s.id === serverId);
    return server ? server.name : "Unknown Server";
  };
  
  // Helper function to format wipe time
  const formatWipeTime = (wipeDate: Date): string => {
    return new Date(wipeDate).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    });
  };
  
  const getFrequencyBadgeColors = (frequency: string) => {
    switch (frequency) {
      case 'weekly':
        return {
          border: 'border-primary',
          bg: 'bg-primary/20',
          text: 'text-primary'
        };
      case 'biweekly':
        return {
          border: 'border-secondary',
          bg: 'bg-secondary/20',
          text: 'text-secondary'
        };
      case 'monthly':
        return {
          border: 'border-accent',
          bg: 'bg-accent/20',
          text: 'text-accent-dark'
        };
      default:
        return {
          border: 'border-primary',
          bg: 'bg-primary/20',
          text: 'text-primary'
        };
    }
  };
  
  return (
    <div className="bg-dark rounded-xl p-6 md:p-8 shadow-lg">
      <h3 className="font-heading text-2xl md:text-3xl text-primary mb-6">Wipe Schedule</h3>
      
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
      >
        {wipeSchedules.map((schedule, index) => {
          const colors = getFrequencyBadgeColors(schedule.frequency);
          
          return (
            <motion.div 
              key={schedule.id}
              className={`bg-dark-light/30 rounded-lg p-4 border-l-4 ${colors.border}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-technical font-bold text-accent text-lg">
                    {getServerName(schedule.serverId)}
                  </h4>
                  <p className="text-light-dark">
                    Every {schedule.frequency === 'biweekly' ? 'other ' : ''}
                    {schedule.frequency === 'monthly' ? 'first ' : ''}
                    Thursday at {formatWipeTime(schedule.wipeDate)} EST
                  </p>
                </div>
                <span className={`${colors.bg} ${colors.text} text-xs font-technical px-2 py-1 rounded uppercase`}>
                  {schedule.frequency}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      
      <div className="mt-6 bg-dark-light/30 rounded-lg p-4">
        <h4 className="font-technical font-bold text-primary">Important Notes:</h4>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-light-dark">
          <li>BP (Blueprint) wipes occur on the first Thursday of each month</li>
          <li>All times are in Eastern Standard Time (EST)</li>
          <li>Special events may alter the wipe schedule</li>
          <li>Follow our Discord for real-time updates</li>
        </ul>
      </div>
    </div>
  );
}
