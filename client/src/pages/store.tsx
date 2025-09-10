import { motion } from "framer-motion";
import { useState } from "react";
import pagePlate from "@assets/page_plate.png";

export default function Store() {
    const [titleDone, setTitleDone] = useState(false);

    return (
        <motion.section
            className="min-h-screen w-full bg-dark/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Touches header */}
            <div className="container mx-auto px-4 pb-12 md:pb-20">
                <div className="relative flex items-start">
                    {/* Plate + centered title */}
                    <motion.div
                        className="relative inline-block z-10"
                        initial={{ y: -48, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 28 }}
                        onAnimationComplete={() => setTitleDone(true)}
                    >
                        <img src={pagePlate} alt="" className="w-80 h-auto" />
                        <h1 className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-primary">
                            Store
                        </h1>
                    </motion.div>

                    {/* Tabs mount only after title anim finishes */}
                    {titleDone && <Tabs />}
                </div>
            </div>
        </motion.section>
    );
}

/** Tabs to the right of the plate/title */
function Tabs() {
    const TABS = ["Overview", "Kits", "VIP", "Donations"] as const;
    type TabKey = typeof TABS[number];
    const [tab, setTab] = useState<TabKey>("Overview");

    return (
        <section className="ml-1">
            {/* Start a bit to the right, then slide into place */}
            <motion.div
                className="relative self-start z-0"
                initial={{ x: -69, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 520, damping: 34 }}
            >
                <div className="inline-flex border border-border bg-dark/80 rounded-none">
                    {TABS.map((t) => {
                        const isActive = tab === t;
                        return (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                className={[
                                    "px-4 py-2 text-sm font-medium select-none transition-colors",
                                    "rounded-none focus:outline-none",
                                    isActive
                                        ? "bg-primary text-white"
                                        : "text-light-dark hover:bg-dark/90"
                                ].join(" ")}
                            >
                                {t}
                            </button>
                        );
                    })}
                </div>
            </motion.div>
        </section>
    );
}
