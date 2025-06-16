import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { StoreItem } from "@/lib/types";

interface VipTiersProps {
  vipItems: StoreItem[];
  onSelect: (item: StoreItem) => void;
}

export default function VipTiers({ vipItems, onSelect }: VipTiersProps) {
  // Format price from cents to dollars/month
  const formatPrice = (priceInCents: number): string => {
    return `$${(priceInCents / 100).toFixed(0)}/month`;
  };
  
  if (vipItems.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-dark rounded-xl p-6 md:p-8 shadow-lg">
      <h3 className="font-heading text-2xl md:text-3xl text-primary text-center mb-8">VIP Benefits</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vipItems.map((item, index) => (
          <motion.div 
            key={item.id}
            className={`bg-dark-light/30 rounded-lg p-5 ${item.isPopular ? 'relative overflow-hidden' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {item.isPopular && (
              <div className="absolute top-0 right-0 bg-secondary text-white text-xs transform rotate-45 translate-x-5 translate-y-2 px-10 py-1 font-bold">
                BEST VALUE
              </div>
            )}
            <h4 className="font-heading text-xl text-secondary mb-4">
              {item.name} - {formatPrice(item.price)}
            </h4>
            <ul className="space-y-2 text-light-dark">
              {Array.isArray(item.contents) && item.contents.map((benefit, i) => (
                <li key={i} className="flex items-center">
                  <Check className="text-green-500 mr-2 h-4 w-4 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
            <Button 
              onClick={() => onSelect(item)}
              className={`mt-4 w-full ${item.isPopular ? 'bg-secondary hover:bg-secondary-dark' : 'bg-primary hover:bg-primary-dark'} text-white font-bold`}
            >
              Select
            </Button>
          </motion.div>
        ))}
      </div>
      
      <p className="text-center text-light-dark/70 mt-6">
        All purchases support server maintenance and development.
        <a href="#benefits" className="text-primary hover:underline ml-1">View full benefits comparison</a>
      </p>
    </div>
  );
}
