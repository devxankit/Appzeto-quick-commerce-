import { useMemo } from 'react';
import HomeHero from '../components/HomeHero';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { useOrders } from '../context/OrdersContext';

export default function OrderAgain() {
  const { orders } = useOrders();

  // Get bestseller products
  const bestsellerProducts = useMemo(() => {
    return products
      .filter((p) => p.tags?.includes('bestseller') || p.tags?.includes('deal-of-the-day'))
      .slice(0, 10);
  }, []);

  return (
    <div className="pb-4">
      {/* Header - Same as Home page */}
      <HomeHero />

      {/* Empty State Illustration - Show when no orders */}
      {orders.length === 0 && (
        <div className="bg-stone-50 py-6 px-4">
          <div className="flex flex-col items-center justify-center max-w-md mx-auto">
            {/* Grocery Illustration */}
            <div className="relative w-full max-w-xs mb-4">
              <div className="relative flex items-center justify-center">
                {/* Yellow Shopping Bag */}
                <div className="relative w-40 h-48 bg-gradient-to-b from-yellow-400 via-yellow-300 to-yellow-500 rounded-b-2xl rounded-t-lg shadow-xl border-2 border-yellow-500/30 flex items-center justify-center">
                  {/* Enhanced bag opening/top with depth */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-8 bg-gradient-to-b from-yellow-500 to-yellow-400 rounded-t-lg shadow-inner"></div>
                  
                  {/* Enhanced bag handle with 3D effect */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-7 border-[4px] border-yellow-600 rounded-full border-b-transparent shadow-lg">
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-4 border-[2px] border-yellow-500/50 rounded-full border-b-transparent"></div>
                  </div>

                  {/* Decorative pattern/stitching on bag */}
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-yellow-600/30"></div>
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 w-28 h-0.5 bg-yellow-600/20"></div>

                  {/* Quick Grocer text inside basket */}
                  <div className="relative z-10 text-center px-4">
                    <span className="text-2xl font-extrabold text-neutral-900 tracking-tight drop-shadow-sm">quick grocer</span>
                    <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full ml-1.5 shadow-sm"></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reordering Message */}
            <h2 className="text-xl font-bold text-neutral-900 mb-1.5 text-center">
              Reordering will be easy
            </h2>
            <p className="text-xs text-neutral-600 text-center max-w-xs leading-snug">
              Items you order will show up here so you can buy them again easily
            </p>
          </div>
        </div>
      )}

      {/* Bestsellers Section */}
      <div className="px-4 mt-4">
        <h2 className="text-lg font-bold text-neutral-900 mb-3">Bestsellers</h2>
        <div className="overflow-x-auto scrollbar-hide pb-4">
          <div className="flex gap-3" style={{ width: 'max-content' }}>
            {bestsellerProducts.map((product, index) => (
              <div key={product.id} className="flex-shrink-0" style={{ width: '160px' }}>
                <ProductCard
                  product={product}
                  showBadge={true}
                  showPackBadge={false}
                  showHeartIcon={true}
                  showRating={true}
                  showVegetarianIcon={true}
                  showOptionsText={index === 0}
                  optionsCount={2}
                  compact={true}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
