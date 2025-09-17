import { useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import pagePlate from "@assets/page_plate.png";
import MonthlyKits from "@/components/store/monthly_kits";
import LifetimeKits from "@/components/store/lifetime_kits";
import Donations from "@/components/store/donations";
import Checkout from "@/components/store/checkout";

const TABS = ["Monthly", "Lifetime", "Donations", "Checkout"] as const;
type TabKey = (typeof TABS)[number];

export default function Store() {
    const [titleDone, setTitleDone] = useState(false);
    const [headerH, setHeaderH] = useState(0);
    const [tab, setTab] = useState<TabKey>("Monthly");

    useLayoutEffect(() => {
        const el = document.querySelector("header");
        const update = () => setHeaderH(el ? Math.ceil(el.getBoundingClientRect().height) : 0);
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    return (
        <motion.section
            className="min-h-screen w-full bg-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="sticky z-40 bg-transparent" style={{ top: `calc(${headerH}px)` }}>
                <div className="container mx-auto">
                    <div className="relative flex items-start">
                        <motion.div
                            className="relative inline-block z-10"
                            initial={{ y: -48, opacity: 0 }}
                            animate={{ y: -18, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 28 }}
                            onAnimationComplete={() => setTitleDone(true)}
                        >
                            <img src={pagePlate} alt="" className="w-80 h-auto drop-shadow-lg" />
                            <h1 className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-primary transform translate-y-[10px]">
                                Store
                            </h1>
                        </motion.div>
                        {titleDone && <Tabs tab={tab} setTab={setTab} />}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-12 md:pb-20">
                {tab === "Monthly" && <MonthlyKits />}
                {tab === "Lifetime" && <LifetimeKits />}
                {tab === "Donations" && <Donations />}
                {tab === "Checkout" && <Checkout />}
            </div>
        </motion.section>
    );
}

function Tabs({ tab, setTab }: { tab: TabKey; setTab: (t: TabKey) => void }) {
    return (
        <section className="ml-0">
            <motion.div
                className="relative self-start z-0"
                initial={{ x: -69, opacity: 0.25 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 520, damping: 34 }}
            >
                <div className="relative inline-flex items-stretch border border-border rounded-none isolate bg-transparent ">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -top-[1px] left-[-5rem] h-[calc(3%+2.5rem)] w-[calc(100.5%+7.5rem)] bg-dark
             [clip-path:polygon(-1px_-1px,calc(100%_-_2.5rem)_0,100%_0,calc(100%_-_2.5rem)_101%,0_101%)]
             [transform:translateZ(0.001px)] -z-10"
                    />
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
                                    isActive ? "bg-primary text-white" : "text-light-dark hover:bg-dark",
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

