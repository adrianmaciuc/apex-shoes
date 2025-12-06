import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { shoes, categories } from '../data/shoes';
import { motion } from 'framer-motion';
import ProductCard from '../components/product/ProductCard';

const HomePage = () => {
  const featuredShoes = shoes.filter((shoe) => shoe.featured);
  const newArrivals = shoes.slice(0, 4);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 to-gray-700">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            className="text-5xl md:text-7xl font-display font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Step Into Style
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover premium footwear for every occasion
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/category/sneakers"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
              style={{ 
                backgroundColor: 'var(--color-accent)',
                color: 'white'
              }}
            >
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
            Featured Collection
          </h2>
          <p className="text-gray-600 text-lg">
            Handpicked favorites from our latest arrivals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredShoes.map((shoe, index) => (
            <ProductCard 
              key={shoe.id}
              shoe={shoe}
              index={index}
              variant="default"
              showBadge="featured"
            />
          ))}
        </div>
      </section>

      {/* Shop by Category */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
              Shop by Category
            </h2>
            <p className="text-gray-600 text-lg">
              Find the perfect fit for your lifestyle
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  to={`/category/${category.id}`}
                  className="group block relative overflow-hidden rounded-2xl aspect-square"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-display font-bold mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {category.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
            New Arrivals
          </h2>
          <p className="text-gray-600 text-lg">
            Fresh styles just landed
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((shoe, index) => (
            <ProductCard 
              key={shoe.id}
              shoe={shoe}
              index={index}
              variant="compact"
              showBadge="new"
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/category/sneakers"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 rounded-full font-semibold transition-all duration-300 hover:bg-gray-900 hover:text-white"
            style={{ 
              borderColor: 'var(--color-primary)',
              color: 'var(--color-primary)'
            }}
          >
            View All Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Stay in the Loop
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Get the latest drops, exclusive deals, and style tips delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            />
            <button
              className="px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:opacity-90"
              style={{ 
                backgroundColor: 'var(--color-accent)',
                color: 'white'
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;