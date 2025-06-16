import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import SteamConnect from "@/components/linkaccount/SteamConnect";
import AccountBenefits from "@/components/linkaccount/AccountBenefits";

export default function LinkAccount() {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectWithSteam = async () => {
    setIsConnecting(true);
    
    try {
      // This is a simulated Steam auth since we don't have actual Steam API integration in this example
      // In a real-world scenario, this would redirect to Steam OpenID
      
      // Simulate successful auth after a delay
      setTimeout(async () => {
        try {
          // Fake Steam data to simulate a successful authentication
          const steamData = {
            steamId: "76561198012345678",
            displayName: "RustPlayer",
            avatarUrl: "https://avatars.steamstatic.com/default.jpg"
          };
          
          // Send Steam data to our backend
          const response = await apiRequest("POST", "/api/users/steam-auth", steamData);
          const data = await response.json();
          
          if (data.success) {
            toast({
              title: "Account Linked!",
              description: "Your Steam account has been successfully linked.",
            });
          }
        } catch (error) {
          toast({
            title: "Authentication Failed",
            description: "Could not authenticate with Steam. Please try again.",
            variant: "destructive",
          });
        } finally {
          setIsConnecting(false);
        }
      }, 1500);
      
    } catch (error) {
      console.error("Steam auth error:", error);
      toast({
        title: "Authentication Error",
        description: "An error occurred during authentication. Please try again.",
        variant: "destructive",
      });
      setIsConnecting(false);
    }
  };

  const handleLoginToDashboard = () => {
    toast({
      title: "Dashboard Login",
      description: "This would redirect to the dashboard login page in a complete implementation.",
    });
  };

  return (
    <motion.section
      className="py-12 md:py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-4xl md:text-5xl text-primary text-center mb-8">Link Your Account</h2>
        <p className="text-light-dark text-center max-w-2xl mx-auto mb-12">
          Connect your Steam account to access exclusive features, track your statistics, and make purchases.
        </p>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Connect account card */}
          <SteamConnect onConnect={handleConnectWithSteam} />
          
          {/* Account benefits */}
          <AccountBenefits onLoginDashboard={handleLoginToDashboard} />
        </div>
        
        {/* Social Media Section */}
        <div className="mt-16">
          <h3 className="font-heading text-2xl md:text-3xl text-primary text-center mb-6">Connect with Our Community</h3>
          <p className="text-light-dark text-center max-w-2xl mx-auto mb-8">
            Follow us on social media to stay updated on server events and connect with other players.
          </p>
          
          <div className="flex justify-center space-x-8">
            <motion.a 
              href="#discord"
              className="social-icon flex flex-col items-center"
              whileHover={{ y: -5, rotate: 3 }}
            >
              <div className="bg-[#5865F2] w-16 h-16 rounded-full flex items-center justify-center mb-2">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </div>
              <span className="text-light-dark">Discord</span>
            </motion.a>
            
            <motion.a 
              href="#tiktok"
              className="social-icon flex flex-col items-center"
              whileHover={{ y: -5, rotate: 3 }}
            >
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mb-2">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </div>
              <span className="text-light-dark">TikTok</span>
            </motion.a>
            
            <motion.a 
              href="#instagram"
              className="social-icon flex flex-col items-center"
              whileHover={{ y: -5, rotate: 3 }}
            >
              <div className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] w-16 h-16 rounded-full flex items-center justify-center mb-2">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </div>
              <span className="text-light-dark">Instagram</span>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
