import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import WipeCountdown from "@/components/wipe/WipeCountdown";
import WipeSchedule from "@/components/wipe/WipeSchedule";
import AfterWipeEvents from "@/components/wipe/AfterWipeEvents";
import { WipeSchedule as WipeScheduleType, Server } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle } from "lucide-react";

export default function Wipe() {
  const { toast } = useToast();
  
  const { data: nextWipe, isLoading: loadingNextWipe } = useQuery<WipeScheduleType>({
    queryKey: ['/api/next-wipe'],
  });
  
  const { data: wipeSchedules, isLoading: loadingSchedules } = useQuery<WipeScheduleType[]>({
    queryKey: ['/api/wipe-schedules'],
  });
  
  const { data: servers, isLoading: loadingServers } = useQuery<Server[]>({
    queryKey: ['/api/servers'],
  });
  
  const isLoading = loadingNextWipe || loadingSchedules || loadingServers;
  
  const handleAddToCalendar = () => {
    if (!nextWipe) return;
    
    toast({
      title: "Calendar Event Created",
      description: "Added server wipe to your calendar",
    });
  };
  
  const handleSetReminder = () => {
    if (!nextWipe) return;
    
    toast({
      title: "Reminder Set",
      description: "We'll remind you 24 hours before the wipe",
    });
  };
  
  if (isLoading) {
    return (
      <div className="py-12 md:py-20 container mx-auto px-4 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <motion.section 
      className="py-12 md:py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-4xl md:text-5xl text-primary text-center mb-12">Upcoming Wipes</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Next wipe countdown */}
          {nextWipe ? (
            <WipeCountdown 
              nextWipe={nextWipe} 
              onAddToCalendar={handleAddToCalendar} 
              onSetReminder={handleSetReminder} 
            />
          ) : (
            <div className="bg-dark p-6 rounded-xl flex items-center justify-center">
              <AlertTriangle className="text-secondary h-6 w-6 mr-2" />
              <p className="text-light-dark">No upcoming wipes scheduled</p>
            </div>
          )}
          
          {/* Wipe schedule */}
          {wipeSchedules && servers && wipeSchedules.length > 0 ? (
            <WipeSchedule 
              wipeSchedules={wipeSchedules} 
              servers={servers} 
            />
          ) : (
            <div className="bg-dark p-6 rounded-xl flex items-center justify-center">
              <AlertTriangle className="text-secondary h-6 w-6 mr-2" />
              <p className="text-light-dark">Failed to load wipe schedules</p>
            </div>
          )}
        </div>
        
        {/* After-wipe events */}
        <AfterWipeEvents />
      </div>
    </motion.section>
  );
}
