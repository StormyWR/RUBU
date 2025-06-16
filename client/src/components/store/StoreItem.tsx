import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Star, StarHalf } from "lucide-react";
import { StoreItem as StoreItemType } from "@/lib/types";
import { useState } from "react";

interface StoreItemProps {
  item: StoreItemType;
  onAddToCart: (item: StoreItemType) => void;
}

export default function StoreItem({ item, onAddToCart }: StoreItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Format price from cents to dollars
  const formatPrice = (priceInCents: number): string => {
    return `$${(priceInCents / 100).toFixed(2)}`;
  };
  
  // Generate star rating display
  const renderRating = (rating: number, maxRating: number = 5) => {
    const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5
    
    return Array.from({ length: maxRating }).map((_, i) => {
      const value = i + 1;
      if (value <= roundedRating) {
        // Full star
        return <Star key={i} className="fill-yellow-400 text-yellow-400" />;
      } else if (value === Math.ceil(roundedRating) && roundedRating % 1 !== 0) {
        // Half star
        return <StarHalf key={i} className="fill-yellow-400 text-yellow-400" />;
      } else {
        // Empty star
        return <Star key={i} className="text-yellow-400/40" />;
      }
    });
  };
  
  return (
    <motion.div 
      className="store-item bg-dark rounded-xl overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {item.imageUrl && (
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-full h-48 object-cover"
          />
        )}
        {item.isPopular && (
          <div className="absolute top-4 right-4 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-full">
            Most Popular
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-heading text-2xl text-primary mb-2">{item.name}</h3>
        <p className="text-light-dark mb-4">{item.description}</p>
        
        <div className="mb-4">
          <h4 className="text-sm text-light-dark/70 font-technical mb-2">INCLUDES:</h4>
          <ul className="text-sm text-light-dark space-y-1">
            {Array.isArray(item.contents) ? (
              item.contents.map((content, index) => (
                <li key={index} className="flex items-center">
                  <Check className="text-green-500 mr-2 h-4 w-4" />
                  {content}
                </li>
              ))
            ) : (
              <li className="flex items-center">
                <Check className="text-green-500 mr-2 h-4 w-4" />
                Package contents
              </li>
            )}
          </ul>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <p className="font-heading text-2xl text-accent">{formatPrice(item.price)}</p>
          {item.ratingCount > 0 && (
            <div className="flex items-center">
              <div className="flex">
                {renderRating(item.rating)}
              </div>
              <span className="text-sm text-light-dark/70 ml-1">({item.ratingCount})</span>
            </div>
          )}
        </div>
        
        <Button 
          onClick={() => onAddToCart(item)}
          className={`w-full ${isHovered ? 'bg-secondary hover:bg-secondary-dark' : 'bg-primary hover:bg-primary-dark'} text-white font-bold transition-colors`}
        >
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
}
