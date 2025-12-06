import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import type { Shoe } from '../../types';
import { motion } from 'framer-motion';

interface ProductCardProps {
  shoe: Shoe;
  index?: number;
  variant?: 'default' | 'compact' | 'featured';
  showBadge?: 'featured' | 'new' | 'sale' | null;
}

const ProductCard = ({ 
  shoe, 
  index = 0, 
  variant = 'default',
  showBadge = null 
}: ProductCardProps) => {
  
  const getBadgeContent = () => {
    if (showBadge === 'featured') {
      return (
        <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
          <Star className="w-4 h-4 fill-current" />
          Featured
        </div>
      );
    }
    if (showBadge === 'new') {
      return (
        <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          NEW
        </div>
      );
    }
    if (showBadge === 'sale') {
      return (
        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          SALE
        </div>
      );
    }
    return null;
  };

  const renderDefault = () => (
    <div className="card overflow-hidden">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={shoe.images[0]}
          alt={shoe.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {getBadgeContent()}
      </div>
      <div className="p-6">
        <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-accent)' }}>
          {shoe.brand}
        </p>
        <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-gray-600 transition-colors">
          {shoe.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {shoe.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
            ${shoe.price}
          </span>
          <span className="text-sm text-gray-500">
            {shoe.colors.length} colors
          </span>
        </div>
      </div>
    </div>
  );

  const renderCompact = () => (
    <div className="card overflow-hidden">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={shoe.images[0]}
          alt={shoe.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {getBadgeContent()}
      </div>
      <div className="p-4">
        <p className="text-xs font-medium mb-1 uppercase tracking-wide" style={{ color: 'var(--color-accent)' }}>
          {shoe.brand}
        </p>
        <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-gray-600 transition-colors line-clamp-1">
          {shoe.name}
        </h3>
        <p className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
          ${shoe.price}
        </p>
      </div>
    </div>
  );

  const renderFeatured = () => (
    <div className="card overflow-hidden">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={shoe.images[0]}
          alt={shoe.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {getBadgeContent()}
      </div>
      <div className="p-8">
        <p className="text-base font-medium mb-2" style={{ color: 'var(--color-accent)' }}>
          {shoe.brand}
        </p>
        <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-gray-600 transition-colors">
          {shoe.name}
        </h3>
        <p className="text-gray-600 mb-6 line-clamp-3">
          {shoe.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
            ${shoe.price}
          </span>
          <div className="flex flex-col items-end">
            <span className="text-sm text-gray-500">
              {shoe.colors.length} colors
            </span>
            <span className="text-sm text-gray-500">
              {shoe.sizes.length} sizes
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const getVariantContent = () => {
    switch (variant) {
      case 'compact':
        return renderCompact();
      case 'featured':
        return renderFeatured();
      default:
        return renderDefault();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/shoe/${shoe.id}`} className="group block">
        {getVariantContent()}
      </Link>
    </motion.div>
  );
};

export default ProductCard;