import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import CommunityStats from "@/components/home/CommunityStats";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.section 
      className="-mt-4 pb-12 md:-mt-4 md:pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        {/* Hero section */}
        <Hero />
        
        {/* Features section */}
        <Features />
        
        {/* Community stats */}
        <CommunityStats />
      </div>
    </motion.section>
  );
}
