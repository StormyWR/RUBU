import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BarChart3, Gift, Users } from "lucide-react";

interface AccountBenefitsProps {
  onLoginDashboard: () => void;
}

export default function AccountBenefits({ onLoginDashboard }: AccountBenefitsProps) {
  const benefits = [
    {
      icon: <BarChart3 className="text-xl text-primary" />,
      title: "Track Your Stats",
      description: "Monitor your K/D ratio, play time, and other performance metrics."
    },
    {
      icon: <Gift className="text-xl text-primary" />,
      title: "Exclusive Rewards",
      description: "Access member-only events, skins, and in-game perks."
    },
    {
      icon: <Users className="text-xl text-primary" />,
      title: "Community Integration",
      description: "Seamlessly connect with our Discord and other community platforms."
    }
  ];
  
  return (
    <motion.div 
      className="bg-dark rounded-xl p-6 md:p-8 shadow-lg"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="font-heading text-2xl text-primary mb-6">Member Benefits</h3>
      
      <div className="space-y-4 mb-6">
        {benefits.map((benefit, index) => (
          <motion.div 
            key={index} 
            className="flex"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + (index * 0.1) }}
          >
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary/20 text-primary">
                {benefit.icon}
              </div>
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-bold text-accent">{benefit.title}</h4>
              <p className="text-light-dark">{benefit.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="bg-dark-light/30 rounded-lg p-4">
        <h4 className="font-technical font-bold text-primary mb-2">Already Connected?</h4>
        <p className="text-light-dark text-sm mb-4">
          If you've already linked your account, you can log in to access your dashboard.
        </p>
        <Button 
          variant="outline"
          onClick={onLoginDashboard}
          className="w-full bg-dark border-2 border-primary hover:bg-primary/10 text-white font-bold"
        >
          Login to Dashboard
        </Button>
      </div>
    </motion.div>
  );
}
