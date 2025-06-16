import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { FaSteam } from "react-icons/fa";

interface SteamConnectProps {
  onConnect: () => void;
}

export default function SteamConnect({ onConnect }: SteamConnectProps) {
  const benefits = [
    "Track your server stats and progress",
    "Receive exclusive rewards and items",
    "Make secure purchases in our store",
    "Participate in server events and giveaways"
  ];
  
  return (
    <motion.div 
      className="bg-dark rounded-xl p-6 md:p-8 shadow-lg"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="font-heading text-2xl text-primary mb-6">Connect with Steam</h3>
      
      <p className="text-light-dark mb-6">
        Link your Steam account to enjoy these benefits:
      </p>
      
      <ul className="space-y-3 mb-8">
        {benefits.map((benefit, index) => (
          <motion.li 
            key={index} 
            className="flex items-center text-light-dark"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + (index * 0.1) }}
          >
            <div className="text-primary mr-3 text-xl">
              <Check className="h-6 w-6" />
            </div>
            {benefit}
          </motion.li>
        ))}
      </ul>
      
      <Button 
        onClick={onConnect}
        className="w-full flex items-center justify-center bg-[#171a21] hover:bg-[#2a3148] text-white font-bold"
      >
        <FaSteam className="w-6 h-6 mr-3" />
        Connect with Steam
      </Button>
    </motion.div>
  );
}
