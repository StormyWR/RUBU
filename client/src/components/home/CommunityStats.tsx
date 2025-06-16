import { motion } from "framer-motion";
import { Users, Server, HeadsetIcon, Heart } from "lucide-react";

const stats = [
  { 
    value: "10K+", 
    label: "MONTHLY PLAYERS", 
    icon: <Users className="h-10 w-10 text-primary/80" />,
    description: "Unique players across all servers each month"
  },
  { 
    value: "3", 
    label: "SERVER VARIANTS", 
    icon: <Server className="h-10 w-10 text-primary/80" />,
    description: "Vanilla, 2x, and PvE options available"
  },
  { 
    value: "24/7", 
    label: "ADMIN SUPPORT", 
    icon: <HeadsetIcon className="h-10 w-10 text-primary/80" />,
    description: "Continuous monitoring and player assistance"
  },
  { 
    value: "99.9%", 
    label: "UPTIME GUARANTEE", 
    icon: <Heart className="h-10 w-10 text-primary/80" />,
    description: "Enterprise-grade reliability and performance"
  }
];

export default function CommunityStats() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4 tracking-wide">SERVER STATISTICS</h2>
          <p className="text-light-dark max-w-2xl mx-auto">
            Join thousands of players on our high-performance dedicated infrastructure
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-dark p-6 rounded-xl border border-teal-700/20 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="mb-4">
                {stat.icon}
              </div>
              <p className="font-heading text-4xl md:text-5xl text-secondary mb-2">{stat.value}</p>
              <p className="text-primary font-technical tracking-wide text-sm mb-2">{stat.label}</p>
              <p className="text-light-dark/70 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
