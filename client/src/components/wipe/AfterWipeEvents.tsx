import { motion } from "framer-motion";

const afterWipeEvents = [
  {
    title: "Supply Drop Festival",
    timing: "First 3 hours after wipe",
    description: "Increased supply drops across the map with better loot."
  },
  {
    title: "Starter Kits",
    timing: "First 24 hours after wipe",
    description: "Free starter kits available for all players who join within 24h."
  },
  {
    title: "Double XP Weekend",
    timing: "First weekend after wipe",
    description: "Earn double XP for all activities during the weekend."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function AfterWipeEvents() {
  return (
    <div className="bg-dark rounded-xl p-6 md:p-8 shadow-lg">
      <h3 className="font-heading text-2xl md:text-3xl text-primary mb-6">After-Wipe Events</h3>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {afterWipeEvents.map((event, index) => (
          <motion.div 
            key={index}
            className="bg-dark-light/30 rounded-lg p-4 border-t-4 border-primary hover:transform hover:-translate-y-1 transition-all"
            variants={itemVariants}
          >
            <h4 className="font-technical font-bold text-accent text-lg">{event.title}</h4>
            <p className="text-light-dark mb-2">{event.timing}</p>
            <p className="text-sm text-light-dark/80">{event.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
