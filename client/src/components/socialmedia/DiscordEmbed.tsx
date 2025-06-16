import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { motion } from "framer-motion";

export default function DiscordEmbed() {
  const discordBenefits = [
    "Server announcements and updates",
    "Find teammates and form alliances",
    "Report issues and get help",
    "Participate in giveaways and events"
  ];
  
  return (
    <div className="mt-12 md:mt-20 bg-dark rounded-xl p-6 md:p-8 shadow-lg max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-center">
        <motion.div 
          className="w-full md:w-1/2 mb-6 md:mb-0 md:pr-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-heading text-2xl md:text-3xl text-primary mb-4">Join Our Discord</h3>
          <p className="text-light-dark mb-4">
            Our Discord server is the central hub for all RustBunnies activities:
          </p>
          <ul className="space-y-2 mb-6">
            {discordBenefits.map((benefit, index) => (
              <motion.li 
                key={index} 
                className="flex items-center text-light-dark"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
              >
                <Check className="text-green-500 mr-2 h-4 w-4" />
                {benefit}
              </motion.li>
            ))}
          </ul>
          <a href="#discord">
            <Button className="inline-flex items-center bg-[#5865F2] hover:bg-[#4752c4] text-white font-bold">
              <FaDiscord className="mr-2" />
              Join 10,000+ members
            </Button>
          </a>
        </motion.div>
        <motion.div 
          className="w-full md:w-1/2 bg-[#2F3136] rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-[#202225] p-3 flex items-center">
            <FaDiscord className="text-[#5865F2] text-xl mr-2" />
            <span className="text-white font-bold">RustBunnies Community</span>
            <span className="ml-2 bg-green-500 text-xs text-white px-2 py-0.5 rounded">ONLINE</span>
          </div>
          <div className="p-4">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">RB</div>
              <div className="ml-3">
                <p className="text-white font-bold">RustBunnies Bot</p>
                <p className="text-xs text-gray-400">Server announcement</p>
              </div>
            </div>
            <div className="bg-[#36393F] p-3 rounded mb-3">
              <p className="text-white font-bold mb-1">🎉 Next Wipe: Thursday at 3PM EST</p>
              <p className="text-gray-300 text-sm">Get ready for our weekly wipe! Don't forget to claim your starter kit.</p>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Today at 2:30 PM</span>
              <span>253 reactions</span>
            </div>
          </div>
          <div className="p-3 bg-[#36393F] mt-3 text-center text-sm text-gray-300">
            Loaded preview of #announcements
          </div>
        </motion.div>
      </div>
    </div>
  );
}
