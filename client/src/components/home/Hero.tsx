  import { motion } from "framer-motion";
  import { Button } from "@/components/ui/button";
  import { Link } from "wouter";
  import { ArrowRight, ShieldCheck, Calendar, Users } from "lucide-react";
  import rustImagePath from "@assets/RUST Logo RGB.png";

  export default function Hero() {
    return (
      <div className="pt-0 pb-16 md:py-10">
        {/* Hero Banner */}
        <div className="flex flex-col-reverse md:flex-row items-center md:items-stretch justify-center md:justify-between mb-8 md:mb-12 min-h-[300px]">
          <motion.div
            className="w-full md:w-1/2 mt-10 md:mt-0 md:pr-8 flex flex-col justify-center h-full text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              {/* Bandana element */}
              <div className="absolute -left-4 top-0 h-20 w-6 bg-red-600 opacity-80 hidden md:block"></div>
              <div className="absolute -left-4 top-0 h-20 w-6 bandana-diagonal hidden md:block"></div>

              <h1 className="font-heading text-5xl md:text-7xl text-primary mb-4 tracking-wide leading-tight relative pt-24">
                WELCOME TO<br/><span className="text-white">THE BURROW</span>
              </h1>
            </div>

            <p className="text-base md:text-lg mb-5 text-light-dark font-medium leading-relaxed max-w-2xl mx-auto md:mx-0">
              You made it. The Burrow's our crew, and you're one of us now. Grab your team and get into some Rust.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link href="/servers">
                <Button size="lg" className="bg-primary hover:bg-primary text-white font-bold px-6 transition-all transform hover:-translate-y-1 shadow-lg group">
                  Join the Burrow <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="https://discord.gg/QNvhAcdxj2" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-dark border border-primary border-opacity-40 hover:bg-opacity-10 hover:bg-primary text-white font-bold px-6 transition-all"
                >
                  Join Discord
                </Button>
              </a>
            </div>
          </motion.div>
          <motion.div
            className="w-full md:w-1/2 flex justify-center items-center relative h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/40 to-secondary/40 blur-xl opacity-40 animate-pulse-slow rounded-xl"></div>

              <img
                src={rustImagePath}
                alt="RustBunnies Logo"
                className="relative w-full max-w-lg z-10"
              />
            </div>
          </motion.div>
        </div>

        {/* Server Stats Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-dark p-8 rounded-xl border border-teal-700 border-opacity-20 flex items-start relative overflow-hidden">
            {/* Bandana accent */}
            <div className="absolute top-0 right-0 h-2 w-full bg-red-600 opacity-20"></div>
            <div className="absolute top-0 right-0 h-2 w-full bandana-diagonal"></div>

            <div className="bg-primary bg-opacity-10 p-3 rounded-lg mr-4 z-10">
              <ShieldCheck className="h-7 w-7 text-primary" />
            </div>
            <div className="z-10">
              <h3 className="font-heading text-xl font-bold text-primary mb-2">ANTI-CHEAT PROTECTED</h3>
              <p className="text-light-dark text-sm opacity-80">Advanced anti-cheat system ensures fair gameplay for all players</p>
            </div>
          </div>

          <div className="bg-dark p-8 rounded-xl border border-teal-700 border-opacity-20 flex items-start relative overflow-hidden">
            {/* Bandana accent */}
            <div className="absolute top-0 right-0 h-2 w-full bg-red-600 opacity-20"></div>
            <div className="absolute top-0 right-0 h-2 w-full bandana-diagonal"></div>

            <div className="bg-primary bg-opacity-10 p-3 rounded-lg mr-4 z-10">
              <Calendar className="h-7 w-7 text-primary" />
            </div>
            <div className="z-10">
              <h3 className="font-heading text-xl font-bold text-primary mb-2">WEEKLY WIPES</h3>
              <p className="text-light-dark text-sm opacity-80">Predictable wipe schedule with special post-wipe events</p>
            </div>
          </div>

          <div className="bg-dark p-8 rounded-xl border border-teal-700 border-opacity-20 flex items-start relative overflow-hidden">
            {/* Bandana accent */}
            <div className="absolute top-0 right-0 h-2 w-full bg-red-600 opacity-20"></div>
            <div className="absolute top-0 right-0 h-2 w-full bandana-diagonal"></div>

            <div className="bg-primary bg-opacity-10 p-3 rounded-lg mr-4 z-10">
              <Users className="h-7 w-7 text-primary" />
            </div>
            <div className="z-10">
              <h3 className="font-heading text-xl font-bold text-primary mb-2">ACTIVE COMMUNITY</h3>
              <p className="text-light-dark text-sm opacity-80">Join thousands of active players and an engaged Discord community</p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
