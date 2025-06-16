import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface StoreCategoriesProps {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
}

export default function StoreCategories({ 
  categories, 
  activeCategory, 
  onChange 
}: StoreCategoriesProps) {
  
  // Convert category slugs to display names
  const getCategoryDisplayName = (categorySlug: string): string => {
    return categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
  };
  
  return (
    <div className="flex flex-wrap justify-center mb-8">
      {categories.map((category, index) => {
        const isActive = category === activeCategory;
        const isFirst = index === 0;
        const isLast = index === categories.length - 1;
        
        return (
          <Button
            key={category}
            onClick={() => onChange(category)}
            variant={isActive ? "default" : "secondary"}
            className={`
              relative 
              ${isActive ? 'bg-primary text-white' : 'bg-dark-light hover:bg-dark-light/70 text-light-dark'}
              ${isFirst ? 'rounded-l-lg' : ''} 
              ${isLast ? 'rounded-r-lg' : ''}
              rounded-none
            `}
          >
            {getCategoryDisplayName(category)}
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-primary rounded-lg -z-10"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </Button>
        );
      })}
    </div>
  );
}
