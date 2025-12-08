import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingCart, Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/product/ProductCard";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = (shoeId: string) => {
    const shoe = wishlistItems.find((item) => item.id === shoeId);
    if (shoe) {
      // Default: first size, first color, quantity 1
      const size = shoe.sizes[0];
      const color = shoe.colors[0];
      addToCart(shoe, size, color, 1);
    }
  };

  return (
    <div className="min-h-screen" data-testid="wishlist-page">
      {/* Hero Section */}
      <section
        className="relative h-[300px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-900 to-pink-700"
        data-testid="wishlist-hero"
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1600)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          data-testid="wishlist-hero-background"
        />
        <div
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          data-testid="wishlist-hero-content"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-display font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            data-testid="wishlist-title"
          >
            <Heart className="inline-block w-12 h-12 mr-3 text-pink-200" />
            My Wishlist
          </motion.h1>
          <motion.p
            className="text-xl text-pink-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            data-testid="wishlist-subtitle"
          >
            {wishlistItems.length} item{wishlistItems.length !== 1 ? "s" : ""}{" "}
            saved
          </motion.p>
        </div>
      </section>

      {/* Empty State */}
      {wishlistItems.length === 0 ? (
        <section
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
          data-testid="wishlist-empty"
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            data-testid="wishlist-empty-content"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-6"
            >
              <Heart className="w-20 h-20 mx-auto text-gray-300" />
            </motion.div>
            <h2
              className="text-3xl font-display font-bold mb-4"
              style={{ color: "var(--color-primary)" }}
              data-testid="wishlist-empty-title"
            >
              Your Wishlist is Empty
            </h2>
            <p
              className="text-xl text-gray-600 mb-8"
              data-testid="wishlist-empty-description"
            >
              Start adding your favorite shoes to build your wishlist!
            </p>
            <motion.a
              href="/"
              className="inline-block px-8 py-4 text-lg font-semibold rounded-full text-white transition-all"
              style={{ backgroundColor: "var(--color-accent)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="wishlist-empty-cta"
            >
              Continue Shopping
            </motion.a>
          </motion.div>
        </section>
      ) : (
        <section
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
          data-testid="wishlist-content"
        >
          {/* Action Bar */}
          <div
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
            data-testid="wishlist-actions"
          >
            <p className="text-gray-600" data-testid="wishlist-count">
              {wishlistItems.length} item{wishlistItems.length !== 1 ? "s" : ""}{" "}
              in your wishlist
            </p>
            <motion.button
              onClick={() => setShowClearConfirm(true)}
              className="px-6 py-2 text-red-600 border-2 border-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="wishlist-clear-button"
            >
              <Trash2 className="w-4 h-4" />
              Clear Wishlist
            </motion.button>
          </div>

          {/* Clear Confirmation Modal */}
          <AnimatePresence>
            {showClearConfirm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
                onClick={() => setShowClearConfirm(false)}
                data-testid="wishlist-clear-modal"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full"
                  onClick={(e) => e.stopPropagation()}
                  data-testid="wishlist-clear-modal-content"
                >
                  <h3
                    className="text-2xl font-display font-bold mb-4"
                    data-testid="wishlist-clear-modal-title"
                  >
                    Clear Wishlist?
                  </h3>
                  <p
                    className="text-gray-600 mb-8"
                    data-testid="wishlist-clear-modal-description"
                  >
                    This action cannot be undone. All items will be removed from
                    your wishlist.
                  </p>
                  <div
                    className="flex gap-4"
                    data-testid="wishlist-clear-modal-actions"
                  >
                    <motion.button
                      onClick={() => setShowClearConfirm(false)}
                      className="flex-1 px-6 py-2 border-2 border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      data-testid="wishlist-clear-cancel"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        clearWishlist();
                        setShowClearConfirm(false);
                      }}
                      className="flex-1 px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      data-testid="wishlist-clear-confirm"
                    >
                      Clear
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Wishlist Grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            data-testid="wishlist-grid"
          >
            <AnimatePresence>
              {wishlistItems.map((shoe, index) => (
                <motion.div
                  key={shoe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group"
                  data-testid={`wishlist-item-${shoe.id}`}
                >
                  {/* Product Card */}
                  <div
                    className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden"
                    data-testid={`wishlist-card-${shoe.id}`}
                  >
                    <ProductCard
                      shoe={shoe}
                      index={index}
                      variant="compact"
                      showBadge={shoe.featured ? "featured" : null}
                    />

                    {/* Action Buttons Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      data-testid={`wishlist-overlay-${shoe.id}`}
                    >
                      <motion.button
                        onClick={() => handleAddToCart(shoe.id)}
                        className="flex items-center gap-2 px-6 py-3 bg-white rounded-lg font-semibold transition-all hover:bg-gray-50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        data-testid={`wishlist-add-to-cart-${shoe.id}`}
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </motion.button>
                      <motion.button
                        onClick={() => removeFromWishlist(shoe.id)}
                        className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        data-testid={`wishlist-remove-${shoe.id}`}
                      >
                        <Trash2 className="w-5 h-5" />
                        Remove
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* CTA Section */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            data-testid="wishlist-cta-section"
          >
            <h2
              className="text-3xl font-display font-bold mb-4"
              style={{ color: "var(--color-primary)" }}
              data-testid="wishlist-cta-title"
            >
              Ready to Get These Shoes?
            </h2>
            <p
              className="text-gray-600 mb-8 text-lg"
              data-testid="wishlist-cta-description"
            >
              Add items to your cart and complete your purchase
            </p>
            <motion.a
              href="/category/sneakers"
              className="inline-block px-8 py-4 text-lg font-semibold rounded-full text-white transition-all"
              style={{ backgroundColor: "var(--color-accent)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="wishlist-cta-button"
            >
              Explore More Shoes
            </motion.a>
          </motion.div>
        </section>
      )}
    </div>
  );
};

export default WishlistPage;
