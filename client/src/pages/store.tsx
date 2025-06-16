import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import StoreItem from "@/components/store/StoreItem";
import VipTiers from "@/components/store/VipTiers";
import StoreCategories from "@/components/store/StoreCategories";
import { StoreItem as StoreItemType } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle } from "lucide-react";

export default function Store() {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState<string>("kits");
  
  const { data: storeItems, isLoading, error } = useQuery<StoreItemType[]>({
    queryKey: ['/api/store-items', activeCategory],
  });
  
  const { data: vipItems } = useQuery<StoreItemType[]>({
    queryKey: ['/api/store-items', 'vip'],
  });
  
  const categories = ["kits", "vip", "bundles", "donations"];
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };
  
  const handleAddToCart = (item: StoreItemType) => {
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
    });
  };
  
  const handleSelectVip = (item: StoreItemType) => {
    toast({
      title: "VIP Package Selected",
      description: `${item.name} has been added to your cart`,
    });
  };
  
  if (isLoading) {
    return (
      <div className="py-12 md:py-20 container mx-auto px-4 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error || !storeItems) {
    return (
      <div className="py-12 md:py-20 container mx-auto px-4">
        <div className="bg-dark p-6 rounded-xl flex items-center justify-center space-x-3">
          <AlertTriangle className="text-secondary h-6 w-6" />
          <p className="text-light-dark">Failed to load store items. Please try again later.</p>
        </div>
      </div>
    );
  }
  
  return (
    <motion.section 
      className="py-12 md:py-20 bg-dark/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-4xl md:text-5xl text-primary text-center mb-12">Store</h2>
        
        {/* Categories tabs */}
        <StoreCategories 
          categories={categories}
          activeCategory={activeCategory}
          onChange={handleCategoryChange}
        />
        
        {/* Store items grid */}
        {activeCategory === "kits" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {storeItems.map((item) => (
              <StoreItem 
                key={item.id} 
                item={item} 
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
        
        {/* VIP benefits */}
        {activeCategory === "vip" && vipItems && (
          <VipTiers vipItems={vipItems} onSelect={handleSelectVip} />
        )}
        
        {/* Empty placeholder for other categories */}
        {(activeCategory === "bundles" || activeCategory === "donations") && (
          <div className="bg-dark p-8 rounded-xl text-center">
            <h3 className="font-heading text-2xl text-primary mb-4">Coming Soon!</h3>
            <p className="text-light-dark">
              We're working on bringing you amazing {activeCategory}. Check back soon!
            </p>
          </div>
        )}
      </div>
    </motion.section>
  );
}
