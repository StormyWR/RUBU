import { motion } from "framer-motion";
import { FaDiscord, FaTiktok, FaInstagram } from "react-icons/fa";

interface SocialPlatform {
  icon: JSX.Element;
  name: string;
  description: string;
  bgColor: string;
  url: string;
}

export default function SocialIcons() {
  const socialPlatforms: SocialPlatform[] = [
    {
      icon: <FaDiscord className="text-5xl text-white mb-4" />,
      name: "Discord",
      description: "Join our active community with 10,000+ members",
      bgColor: "bg-[#5865F2]",
      url: "#discord"
    },
    {
      icon: <FaTiktok className="text-5xl text-white mb-4" />,
      name: "TikTok",
      description: "Watch our raid highlights and funny moments",
      bgColor: "bg-[#000000]",
      url: "#tiktok"
    },
    {
      icon: <FaInstagram className="text-5xl text-white mb-4" />,
      name: "Instagram",
      description: "See server updates and community screenshots",
      bgColor: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]",
      url: "#instagram"
    }
  ];
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {socialPlatforms.map((platform, index) => (
        <motion.a 
          key={index}
          href={platform.url}
          className={`social-icon ${platform.bgColor} rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5, rotate: 2 }}
        >
          {platform.icon}
          <h3 className="font-heading text-2xl text-white mb-2">{platform.name}</h3>
          <p className="text-white/80">{platform.description}</p>
          <div className="mt-4 inline-block bg-white/20 rounded-full px-4 py-2 text-white font-bold">
            {platform.name === "Discord" ? "Join Server" : "Follow Us"}
          </div>
        </motion.a>
      ))}
    </div>
  );
}
