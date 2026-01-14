import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import type { CompletedOrder } from "../types";

const funnyMessages = [
  "🤖 AI system processing your order...",
  "🧠 Training neural network about your taste...",
  "🚀 Launching delivery rockets...",
  "🎯 Optimizing quantum algorithm...",
  "⚡ Charging turbo processors...",
  "🎨 Digital painting in progress...",
  "🔮 Consulting ancient prophecies...",
  "🎪 Computing gymnastics...",
];

export default function OrderProcessingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    // Redirect to home if no order data
    if (!location.state) {
      navigate("/", { replace: true });
      return;
    }

    // Rotate messages every 3 seconds
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % funnyMessages.length);
    }, 3000);

    // Navigate to success page after 5 seconds
    const navigationTimer = setTimeout(() => {
      navigate("/order-success", {
        state: location.state as CompletedOrder,
        replace: true,
      });
    }, 10000);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(navigationTimer);
    };
  }, [navigate, location.state]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        {/* Spinning Animation */}
        <div className="relative mb-8">
          {/* Outer rotating ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 mx-auto border-8 border-blue-200 border-t-blue-600 rounded-full"
          />

          {/* Middle rotating ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-8 border-purple-200 border-t-purple-600 rounded-full"
          />

          {/* Inner rotating ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-8 border-pink-200 border-t-pink-600 rounded-full"
          />

          {/* Center pulse dot */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
          />
        </div>

        {/* Funny Messages */}
        <motion.div
          key={currentMessageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <p className="text-xl font-semibold text-gray-800">
            {funnyMessages[currentMessageIndex]}
          </p>
        </motion.div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-2 h-2 bg-blue-600 rounded-full"
            />
          ))}
        </div>

        {/* Additional info */}
        <p className="mt-8 text-sm text-gray-600">
          Please don't close this window...
        </p>
      </motion.div>
    </div>
  );
}
