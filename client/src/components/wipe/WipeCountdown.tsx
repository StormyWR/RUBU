import { motion } from "framer-motion";
import { CountdownTimer } from "@/components/ui/countdown-timer";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { WipeSchedule } from "@/lib/types";

interface WipeCountdownProps {
  nextWipe: WipeSchedule;
  onAddToCalendar: () => void;
  onSetReminder: () => void;
}

export default function WipeCountdown({ nextWipe, onAddToCalendar, onSetReminder }: WipeCountdownProps) {
  return (
    <div className="bg-dark rounded-xl p-6 md:p-8 shadow-lg overflow-hidden relative">
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full -mr-20 -mt-20 z-0"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full -ml-16 -mb-16 z-0"></div>
      
      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="font-heading text-2xl md:text-3xl text-primary mb-6">
          Next {nextWipe.frequency.charAt(0).toUpperCase() + nextWipe.frequency.slice(1)} Server Wipe
        </h3>
        
        <div className="mb-8">
          <CountdownTimer 
            targetDate={new Date(nextWipe.wipeDate)} 
            onComplete={() => console.log("Wipe completed!")} 
          />
        </div>
        
        <div className="bg-dark-light/30 rounded-lg p-4 mb-6">
          <p className="text-light-dark flex items-start">
            <Info className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
            All player progress, buildings, and items will be reset. Make sure to use or transfer valuable items before the wipe!
            {nextWipe.isBlueprintWipe && (
              <span className="font-bold text-secondary ml-1">This will also be a Blueprint wipe!</span>
            )}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Button 
            onClick={onAddToCalendar}
            className="bg-primary hover:bg-primary-dark text-white font-bold"
          >
            Add to Calendar
          </Button>
          <Button 
            variant="outline"
            onClick={onSetReminder}
            className="bg-dark border-2 border-primary hover:bg-primary/10 text-white font-bold"
          >
            Set Reminder
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
