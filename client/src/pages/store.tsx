import { useState, useLayoutEffect, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import pagePlate from "@assets/page_plate.png";
import imgVIP1 from "@assets/cloth_VIP1.png";
import imgVIP2 from "@assets/wood_VIP2.png";
import imgVIP3 from "@assets/stone_VIP3.png";
import imgVIP4 from "@assets/metal.f_VIP4.png";
import imgVIP5 from "@assets/hqm_VIP5.png";

const TABS = ["Monthly", "Lifetime", "Donations"] as const;
type TabKey = (typeof TABS)[number];

type ProductItem = { id: string; image: string; name: string; subtitle: string; price: string };

const MONTHLY_ITEMS: ProductItem[] = [
    { id: "vip-1", image: imgVIP1, name: "Twig", subtitle: "Small Stash",  price: "$9.99"  },
    { id: "vip-2", image: imgVIP2, name: "Wood", subtitle: "Small Box",    price: "$19.99" },
    { id: "vip-3", image: imgVIP3, name: "Stone", subtitle: "Large Box",    price: "$29.99" },
    { id: "vip-4", image: imgVIP4, name: "Metal", subtitle: "Coffin",       price: "$39.99" },
    { id: "vip-5", image: imgVIP5, name: "HQM",   subtitle: "Supply Drop",  price: "$49.99" },
];

export default function Store() {
    const [titleDone, setTitleDone] = useState(false);
    const [headerH, setHeaderH] = useState(0);
    const [tab, setTab] = useState<TabKey>("Monthly");
    const [startAnim, setStartAnim] = useState(false);
    const [kitViewOpen, setKitViewOpen] = useState(false);
    const [selected, setSelected] = useState<ProductItem | null>(null);

    useLayoutEffect(() => {
        const el = document.querySelector("header");
        const update = () => setHeaderH(el ? Math.ceil(el.getBoundingClientRect().height) : 0);
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const gridRef = useRef<HTMLDivElement | null>(null);
    const inView = useInView(gridRef, { amount: 0.2, once: true });

    useEffect(() => {
        const t = setTimeout(() => setStartAnim(true), 2000);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (inView) setStartAnim(true);
    }, [inView]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setKitViewOpen(false);
        };
        if (kitViewOpen) window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [kitViewOpen]);

    const openKitView = (item: ProductItem) => {
        setSelected(item);
        setKitViewOpen(true);
    };

    return (
        <motion.section
            className="min-h-screen w-full bg-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="sticky z-40 bg-transparent" style={{ top: `calc(${headerH}px - 1px)` }}>
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
                {tab === "Monthly" && (
                    <div className="mt-10">
                        <div className="h-px bg-dark w-full mb-6 p-.75" />
                        <div ref={gridRef} className="grid grid-cols-5 gap-4">
                            {MONTHLY_ITEMS.map((item, idx) => (
                                <ProductCard
                                    key={item.id}
                                    item={item}
                                    index={idx}
                                    start={startAnim}
                                    onView={openKitView}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <KitViewModal open={kitViewOpen} item={selected} onClose={() => setKitViewOpen(false)} />
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
                                    isActive ? "bg-primary text-white" : "text-light-dark hover:bg-dark",
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

function ProductCard({
                         item,
                         index,
                         start,
                         onView,
                     }: {
    item: ProductItem;
    index: number;
    start: boolean;
    onView: (item: ProductItem) => void;
}) {
    const delays = [0.0, 0.2, 0.4, 0.6, 0.8];
    const delay = delays[index] ?? index * 0.4;
    const btnDelay = delay + 0.4;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 1.12 }}
            animate={start ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 2 }}
            transition={{ duration: 0.3, ease: "easeOut", delay }}
            className="w-full"
        >
            <div className="bg-dark/80 border border-border rounded-2xl overflow-hidden aspect-[6.5/10] w-full p-3 pb-20 relative flex justify-center items-start">
                <img src={item.image} alt={item.name} className="object-contain max-w-full max-h-full" />

                <div className="absolute inset-x-0 bottom-14 z-10 px-3 text-center">
                    <div className="text-sm font-heading font-bold text-light leading-tight">
                        {item.name} <span className="font-technical uppercase tracking-[0.08em] text-light/80">- {item.subtitle}</span>
                    </div>
                    <div className="text-xs font-technical tabular-nums mt-0.5">
                        <span className="text-red-500 font-bold">{item.price}</span>{" "}
                        <span className="text-light/70">/ Monthly</span>
                    </div>
                </div>

                <motion.button
                    initial={{ opacity: 0, scale: 1.12 }}
                    animate={start ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.12 }}
                    transition={{ duration: 0.3, ease: "easeOut", delay: btnDelay }}
                    onClick={() => onView(item)}
                    className="absolute inset-x-0 bottom-0 h-10 bg-primary text-white font-bold rounded-none flex items-center justify-center hover:bg-primary/90 z-10"
                >
                    VIEW KIT
                </motion.button>

                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_12px_24px_rgba(0,0,0,0.45),inset_0_-12px_24px_rgba(0,0,0,0.35)]"
                />
            </div>
        </motion.div>
    );
}

function KitViewModal({
                          open,
                          item,
                          onClose,
                      }: {
    open: boolean;
    item: ProductItem | null;
    onClose: () => void;
}) {
    if (!open || !item) return null;

    return (
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center">
            <motion.div
                className="absolute inset-0 bg-black/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={onClose}
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
                className="relative w-[min(92vw,800px)] max-h-[85vh]"
            >
                <div className="relative overflow-hidden rounded-2xl border border-teal-700/40 bg-[#071E1E]/95 shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_400px_at_80%_-10%,rgba(0,255,255,0.12),transparent_60%)]" />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent_6%)]" />

                    <div className="flex items-center justify-between gap-4 border-b border-teal-700/30 px-6 py-4">
                        <div className="flex items-center gap-4">
                            <div>
                                <div className="text-xl md:text-2xl font-heading font-bold text-primary leading-tight">
                                    {item.name} <span className="font-technical uppercase tracking-[0.08em] text-light/80">- {item.subtitle}</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="h-9 w-9 rounded-md bg-dark/70 border border-teal-700/40 hover:bg-dark text-light"
                        >
                            ×
                        </button>
                    </div>

                    <div className="relative p-6">
                        <div
                            className="relative rounded-xl border border-teal-700/30 bg-[#0B2626]/80 min-h-[420px] p-4 md:p-6">
                            <div
                                className="absolute left-6 top-4 w-[18%] min-w-[72px] aspect-square rounded-lg bg-dark/70 border border-teal-700/30 grid place-items-center overflow-hidden shadow-[0_6px_18px_rgba(0,0,0,0.35)]">
                                <img src={item.image} className="object-contain w-[100%] h-[100%]"/>
                                <div
                                    className="absolute left-1/2 top-[calc(100%+6px)] -translate-x-1/2 w-[140%] h-6 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm shadow-[0_8px_24px_rgba(255,255,255,0.15)]"/>
                            </div>

                            <div
                                className="absolute left-6 top-[calc(1rem+18%+6rem)] w-[18%] min-w-[72px] max-w-[220px] z-20">
                                <div
                                    className="relative rounded-xl px-3 pt-3 pb-3 bg-white/5 border border-white/10 backdrop-blur-sm text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_20px_40px_rgba(0,0,0,0.35)] -top-5">
                                    {/* title + price (formatted like your other pill) */}
                                    <div className="space-y-1">
                                        <div className="text-[11px] font-heading text-light/90 leading-tight">
                                            {item.name} <span
                                            className="font-technical uppercase tracking-[0.08em] text-light/70">- {item.subtitle}</span>
                                        </div>
                                        <div className="text-[11px] font-technical tabular-nums">
                                            <span className="text-red-500 font-bold">{item.price}</span>
                                            <span className="text-light/70"> / Monthly</span>
                                        </div>
                                    </div>

                                    {/* short description */}
                                    <p className="mt-2 px-0 text-[10px] leading-relaxed text-light/80">
                                        Premium starter kit tuned for fast progression. Includes essentials and a few
                                        bonuses to get you established quickly.
                                    </p>

                                    {/* button locked to pill bottom */}

                                </div>
                            </div>
                            <button
                                className="absolute left-[calc(24px+9%)] -translate-x-1/2 bottom-7 h-9 w-[18%] rounded-md bg-primary text-white font-bold hover:bg-primary/90"
                                >
                                Add to Cart
                            </button>

                            <div className="pt-2 pl-[calc(18%+2rem)]">
                                <div
                                    className="h-[360px] w-100 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_20px_40px_rgba(0,0,0,0.35)] p-5 overflow-auto">
                                </div>
                            </div>

                            <div
                                className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04),inset_0_24px_48px_rgba(0,0,0,0.28)]"/>
                            <div
                                className="pointer-events-none absolute inset-0 rounded-xl [mask-image:linear-gradient(to_bottom,black,transparent_85%)] bg-[repeating-linear-gradient(180deg,rgba(255,255,255,0.04)_0px,rgba(255,255,255,0.04)_1px,transparent_2px,transparent_4px)]"/>
                        </div>
                    </div>

                    <div
                        className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)] bg-[repeating-linear-gradient(180deg,rgba(255,255,255,0.04)_0px,rgba(255,255,255,0.04)_1px,transparent_2px,transparent_4px)]"/>
                </div>
            </motion.div>
        </motion.div>
    );
}


