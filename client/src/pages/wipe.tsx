import { useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import pagePlate from "@assets/page_plate.png";

export default function Wipe() {
  const [titleDone, setTitleDone] = useState(false);
  const [headerH, setHeaderH] = useState(0);

  useLayoutEffect(() => {
    const el = document.querySelector("header");
    const update = () => setHeaderH(el ? Math.ceil(el.getBoundingClientRect().height) : 0);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
      <motion.section
          className="min-h-screen w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
      >
        <div className="sticky z-40 bg-transparent" style={{ top: `${headerH}px` }}>
          <div className="container mx-auto">
            <div className="relative flex items-start">
              {/* Plate + centered title */}
              <motion.div
                  className="relative inline-block z-10"
                  initial={{ y: -48, opacity: 0 }}
                  animate={{ y: -18, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  onAnimationComplete={() => setTitleDone(true)}
              >
                <img src={pagePlate} alt="" className="w-80 h-auto drop-shadow-xl" />
                <h1 className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-primary transform translate-y-[10px]">
                  Wipes
                </h1>
              </motion.div>
              {titleDone && <Tabs/>}
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 pb-12 md:pb-20"/>
      </motion.section>
  );
}

function Tabs() {
  const TABS = ["Next Wipe", "Schedule", "Events"] as const;
  type TabKey = (typeof TABS)[number];
  const [tab, setTab] = useState<TabKey>("Next Wipe");

  return (
      <section className="ml-0">
        <motion.div
            className="relative self-start z-0"
            initial={{ x: -69, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 520, damping: 34 }}
        >
          <div className="relative inline-flex items-stretch border border-border bg-dark rounded-none">
            <div aria-hidden className="h-10 w-20 -ml-20 bg-dark/100" />
            {TABS.map((t) => {
              const isActive = tab === t;
              return (
                  <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={[
                        "h-10 px-4 text-sm font-medium select-none",
                        "flex items-center justify-center",
                        "transition-colors rounded-none focus:outline-none",
                        isActive ? "bg-primary text-white" : "text-light-dark hover:bg-dark/90",
                      ].join(" ")}
                  >
                    {t}
                  </button>
              );
            })}
            <div
                aria-hidden
                className="absolute right-0 top-0 h-10 w-10 -mr-10 z-10 bg-dark [clip-path:polygon(0%_0%,100%_0%,0%_100%)]"
            />
          </div>
        </motion.div>
      </section>
  );
}
