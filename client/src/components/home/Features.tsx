import { motion } from "framer-motion";
import { Server, Shield, Zap, Wrench, Clock, UserPlus } from "lucide-react";

const features = [
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: "PERFORMANCE OPTIMIZED",
    description: "Experience steady 60+ FPS gameplay with our enterprise-grade hardware and optimized server configuration.",
    color: "from-primary/20 to-primary/5"
  },
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    title: "ACTIVE ADMINISTRATION",
    description: "Our dedicated admin team ensures a fair gaming environment with 24/7 monitoring and swift issue resolution.",
    color: "from-primary/20 to-primary/5"
  },
  {
    icon: <Wrench className="h-6 w-6 text-primary" />,
    title: "BALANCED GAMEPLAY",
    description: "Carefully tuned gather rates and plugin configurations provide an engaging but fair progression system.",
    color: "from-primary/20 to-primary/5"
  },
  {
    icon: <Clock className="h-6 w-6 text-secondary" />,
    title: "PREDICTABLE WIPES",
    description: "Set your calendar with our regular Thursday wipe schedule, with both map and blueprint wipes announced in advance.",
    color: "from-secondary/20 to-secondary/5"
  },
  {
    icon: <UserPlus className="h-6 w-6 text-secondary" />,
    title: "TEAM MANAGEMENT",
    description: "Advanced team system with team UI, custom team size limits, and team-based progression tracking.",
    color: "from-secondary/20 to-secondary/5"
  },
  {
    icon: <Server className="h-6 w-6 text-secondary" />,
    title: "PREMIUM INFRASTRUCTURE",
    description: "Built on enterprise-grade hardware with DDoS protection and geographic redundancy for maximum reliability.",
    color: "from-secondary/20 to-secondary/5"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4
    }
  }
};

export default function Features() {
  return (
    <section className="py-16 border-y border-teal-700/20 bandana-diagonal">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4 tracking-wide">SERVER FEATURES</h2>
          <p className="text-light-dark max-w-2xl mx-auto">
            Our servers are engineered for serious Rust players who demand performance, stability, and fair gameplay
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-dark rounded-lg p-6 border border-teal-700 border-opacity-20 hover:border-opacity-40 transition-all"
              variants={itemVariants}
            >
              <div className={`bg-gradient-to-br ${feature.color} p-3 rounded-lg inline-flex items-center justify-center mb-4`}>
                {feature.icon}
              </div>
              <h3 className="font-heading text-xl text-primary mb-2">{feature.title}</h3>
              <p className="text-light-dark opacity-80 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
