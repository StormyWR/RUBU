// components/store/lifetime_kits.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import imgVIP1 from "@assets/cloth_VIP1.png";
import imgVIP2 from "@assets/wood_VIP2.png";
import imgVIP3 from "@assets/stone_VIP3.png";
import imgVIP4 from "@assets/metal.f_VIP4.png";
import imgVIP5 from "@assets/hqm_VIP5.png";

const DROPDOWN_OPTIONS = ["RustBunnies | 2X | Weekly/Thursdays"];

const CURRENCY_OPTIONS = [
    { code: "USD", symbol: "$", rate: 1 },
    { code: "EUR", symbol: "€", rate: 0.92 },
    { code: "GBP", symbol: "£", rate: 0.8 },
    { code: "AUD", symbol: "A$", rate: 1.5 },
    { code: "CAD", symbol: "C$", rate: 1.35 },
];

const CURRENCY_FLAG: Record<string, string> = {
    USD: "flag_us.png",
    EUR: "flag_eu.png",
    GBP: "flag_gb.png",
    AUD: "flag_au.png",
    CAD: "flag_ca.png",
};

type ProductItem = {
    id: string;
    image: string;
    name: string;
    subtitle: string;
    price: string;
    desc?: string;
};

const IMG: Record<string, string> = (() => {
    const files = import.meta.glob("@assets/*.{png,jpg,jpeg,webp}", {
        eager: true,
        query: "?url",
        import: "default",
    }) as Record<string, string>;
    const out: Record<string, string> = {};
    for (const [p, url] of Object.entries(files)) {
        const fname = p.split("/").pop()!;
        out[fname] = url as unknown as string;
    }
    return out;
})();

const KIT_FILES: Record<string, { kit: string; armor: string }> = {
    "vip-1": { kit: "cloth_kit.png", armor: "cloth_armor.png" },
    "vip-2": { kit: "wood_kit.png", armor: "wood_armor.png" },
    "vip-3": { kit: "stone_kit.png", armor: "stone_armor.png" },
    "vip-4": { kit: "metal_kit.png", armor: "metal_armor.png" },
    "vip-5": { kit: "hqm_kit.png", armor: "hqm_armor.png" },
};

const LIFETIME_ITEMS: ProductItem[] = [
    { id: "vip-1", image: imgVIP1, name: "Twig", subtitle: "Small Stash", price: "$19.99", desc: "Early-game essentials—bags, tools, and basic mats—to claim space and craft a secure starter." },
    { id: "vip-2", image: imgVIP2, name: "Wood", subtitle: "Small Box", price: "$39.99", desc: "Sustainable growth pack with extra mats and upkeep to expand, roam, and keep furnaces running." },
    { id: "vip-3", image: imgVIP3, name: "Stone", subtitle: "Large Box", price: "$59.99", desc: "Mid-game stability: stone and deployables to thicken walls, improve upkeep, and hold territory longer." },
    { id: "vip-4", image: imgVIP4, name: "Metal", subtitle: "Coffin", price: "$79.99", desc: "Advanced progression—metal build supplies and key components to harden your base and push monuments." },
    { id: "vip-5", image: imgVIP5, name: "HQM", subtitle: "Supply Drop", price: "$99.99", desc: "End-game cache: high-quality metal and parts for clan builds, raids, and steady late-wipe pressure." },
];

export default function LifetimeKits() {
    const [startAnim, setStartAnim] = useState(false);
    const [kitViewOpen, setKitViewOpen] = useState(false);
    const [selected, setSelected] = useState<ProductItem | null>(null);
    const [menuOpt, setMenuOpt] = useState("");
    const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0]);
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

    const formatPrice = useMemo(
        () => (usdText: string) => {
            const base = parseFloat(usdText.replace(/[^0-9.]/g, "")) || 0;
            const val = base * currency.rate;
            return `${currency.symbol}${val.toFixed(2)}`;
        },
        [currency],
    );

    const openKitView = (item: ProductItem) => {
        setSelected(item);
        setKitViewOpen(true);
    };

    const onAddToCart = (item: ProductItem) => {
        console.log("add to cart", item.id);
    };

    return (
        <div>
            <div className="mb-3 flex items-start gap-3 flex-nowrap">
                <div
                    aria-label={`Country for ${currency.code}`}
                    className="relative h-24 w-24 ml-24 rounded-full border border-border bg-white/5 overflow-hidden shrink-0"
                >
                    <img
                        src={IMG[CURRENCY_FLAG[currency.code]]}
                        alt=""
                        className="h-full w-full object-cover"
                        draggable={false}
                    />
                </div>

                <div className="flex-1 min-w-0 mt-8">
                    <div className="flex items-center gap-3">
                        <label htmlFor="store-menu" className="sr-only">Menu</label>
                        <select
                            id="store-menu"
                            value={menuOpt}
                            onChange={(e) => setMenuOpt(e.target.value)}
                            className={[
                                "h-6 w-full px-1 rounded-md bg-dark/70 text-[11px]",
                                menuOpt === "" ? "text-light/50" : "text-light",
                                "hover:bg-dark/80 focus:outline-none focus:ring-1 focus:ring-primary/60",
                            ].join(" ")}
                        >
                            <option value="" disabled>Select a server...</option>
                            {DROPDOWN_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>

                        <label htmlFor="currency-menu" className="sr-only">Currency</label>
                        <select
                            id="currency-menu"
                            value={currency.code}
                            onChange={(e) => {
                                const next = CURRENCY_OPTIONS.find((c) => c.code === e.target.value)!;
                                setCurrency(next);
                            }}
                            className="h-6 w-28 px-2 rounded-md bg-dark/70 text-light text-[11px] hover:bg-dark/80 focus:outline-none focus:ring-1 focus:ring-primary/60 mr-24"
                        >
                            {CURRENCY_OPTIONS.map((c) => (
                                <option key={c.code} value={c.code}>{c.code}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-1 px-1 text-[10px] leading-relaxed text-light/80">
                        <span className="font-semibold">Claiming Your Kit:</span> Link your account, buy your desired kit, hop on the server, and type <span className="font-mono">/kit</span> to grab it. If you’re online when you buy, you might need to reload. If you’re offline, it’ll be waiting next time you log in.
                        <br />
                        Didn’t get it? No problem — Make a ticket in our <a
                        href="https://discord.gg/5uV8xFa6KR"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline hover:text-primary/80"
                    >Discord</a> and we’ll sort it out.
                    </div>
                </div>
            </div>

            <div className="h-1 rounded bg-dark w-full mb-6 p-.75" />

            <div ref={gridRef} className="grid grid-cols-5 gap-4">
                {LIFETIME_ITEMS.map((item, idx) => (
                    <ProductCard
                        key={item.id}
                        item={item}
                        index={idx}
                        start={startAnim}
                        onView={openKitView}
                        priceFmt={formatPrice}
                    />
                ))}
            </div>

            <KitViewModal
                open={kitViewOpen}
                item={selected}
                onClose={() => setKitViewOpen(false)}
                onAdd={() => selected && onAddToCart(selected)}
                priceFmt={formatPrice}
            />
        </div>
    );
}

function ProductCard({
                         item,
                         index,
                         start,
                         onView,
                         priceFmt,
                     }: {
    item: ProductItem;
    index: number;
    start: boolean;
    onView: (item: ProductItem) => void;
    priceFmt: (usdText: string) => string;
}) {
    const delays = [0.8, 0.6, 0.4, 0.2, 0.0];
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
                        <span className="text-red-500 font-medium">{priceFmt(item.price)}</span>{" "}
                        <span className="text-light/70">/ Lifetime</span>
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
                          onAdd,
                          priceFmt,
                      }: {
    open: boolean;
    item: ProductItem | null;
    onClose: () => void;
    onAdd: () => void;
    priceFmt?: (usdText: string) => string;
}) {
    const files = item ? KIT_FILES[item.id] : null;

    return (
        <AnimatePresence>
            {open && item && (
                <motion.div
                    key="kv-root"
                    className="backdrop-blur-sm fixed inset-0 z-[100] flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div
                        aria-hidden
                        className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(120%_100%_at_50%_50%,rgba(0,0,0,0)_40%,rgba(0,0,0,0.45)_70%,rgba(0,0,0,0.85)_100%)]"
                    />
                    <motion.div
                        className="absolute inset-0 bg-black/70"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.div
                        key="kv-frame"
                        initial={{ opacity: 0, scale: 0.96, y: 14 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 14 }}
                        transition={{ type: "spring", stiffness: 420, damping: 30 }}
                        className="relative w-[min(94vw,750px)] max-h-[92vh]"
                    >
                        <div className="relative">
                            <div className="grid grid-cols-3 gap-0 items-stretch">
                                <div className="col-span-1 -my-5 relative bg-dark rounded-l-2xl rounded-r-none border border-border border-r-0 p-7 flex flex-col overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.35)] z-20">
                                    <div className="w-30 h-30 rounded-lg border border-border bg-black/40 grid place-items-center overflow-hidden mb-4">
                                        <img src={item.image} alt="" className="object-contain w-full h-full" />
                                    </div>
                                    <div className="text-xl font-heading font-bold text-light leading-tight">
                                        {item.name} <span className="font-technical uppercase tracking-[0.08em] text-light/80">- {item.subtitle}</span>
                                    </div>
                                    <div className="text-sm font-technical tabular-nums mt-1">
                                        <span className="text-red-500 font-bold">{item.price}</span> <span className="text-light/70">/ Lifetime</span>
                                    </div>
                                    <div className="mt-4 text-sm text-light/85 leading-relaxed">{item.desc}</div>
                                    <button onClick={onAdd} className="mt-auto h-10 w-full rounded-md bg-primary text-white font-bold hover:bg-primary/90">
                                        Add to Cart
                                    </button>
                                    <div
                                        aria-hidden
                                        className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_88%)] bg-[repeating-linear-gradient(180deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_2px,transparent_4px)]"
                                    />
                                    <div
                                        aria-hidden
                                        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(500px_220px_at_20%_-10%,rgba(255,255,255,0.35),transparent_60%)] bg-[linear-gradient(135deg,rgba(0,0,0,0)_0%,rgba(0,255,255,0.12)_28%,rgba(0,0,0,0)_55%)]"
                                    />
                                </div>

                                <motion.div
                                    key="kv-right"
                                    initial={{ x: -420, opacity: 0 }}
                                    animate={{ x: -5, opacity: 1 }}
                                    exit={{ x: -420, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 520, damping: 36, mass: 0.9, delay: 0.05 }}
                                    className="col-span-2 relative bg-white/5 border border-border border-l p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
                                >
                                    <div className="relative w-full h-[62vh] min-h-[420px] max-h-[720px] rounded-xl border border-white/10 bg-white/5">
                                        <div className="p-5 flex flex-col items-start gap-4">
                                            {files && IMG[files.kit] && (
                                                <img src={IMG[files.kit]} alt="" className="block w-[450px] max-w-full h-auto drop-shadow-xl" />
                                            )}
                                            {files && IMG[files.armor] && (
                                                <img src={IMG[files.armor]} alt="" className="block w-[450px] max-w-full h-auto drop-shadow" />
                                            )}
                                        </div>
                                    </div>

                                    <motion.div
                                        key="kv-accent"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.18, delay: 0.06 }}
                                        className="absolute left-full -ml-px -top-5 -bottom-5 w-12 rounded-r-2xl rounded-l-none bg-dark border border-border overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.35)] z-20"
                                    >
                                        <button
                                            onClick={onClose}
                                            aria-label="Close"
                                            className="absolute top-3 left-1/2 -translate-x-1/2 h-8 w-8 rounded-md bg-dark/90 border border-border text-light hover:bg-dark shadow-md"
                                        >
                                            ×
                                        </button>
                                        <div
                                            aria-hidden
                                            className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_88%)] bg-[repeating-linear-gradient(180deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_2px,transparent_4px)]"
                                        />
                                        <div
                                            aria-hidden
                                            className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(500px_220px_at_20%_-10%,rgba(255,255,255,0.35),transparent_60%)] bg-[linear-gradient(135deg,rgba(0,0,0,0)_0%,rgba(0,255,255,0.12)_28%,rgba(0,0,0,0)_55%)]"
                                        />
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
