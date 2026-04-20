import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const [showBubble, setShowBubble] = useState(false);
  const phoneNumber = "601111697251";
  const message = "[CPD] Hi, I am interested in Central Park Damansara. Send me Upcoming project details.\n\nMy name is";
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  useEffect(() => {
    // Show bubble after 3 seconds
    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      {/* Proactive Chat Bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="mb-4 mr-2 relative"
          >
            <div className="bg-white p-5 rounded-2xl rounded-br-none shadow-[0_15px_40px_rgba(0,0,0,0.15)] border border-nature-100 max-w-[240px]">
              <button 
                onClick={() => setShowBubble(false)}
                className="absolute -top-2 -right-2 bg-white text-nature-400 hover:text-nature-900 p-1 rounded-full shadow-md border border-nature-50 transition-colors"
                aria-label="Close message"
              >
                <X size={14} />
              </button>
              
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 border border-nature-100 overflow-hidden">
                  <img 
                    src="https://lh3.googleusercontent.com/d/1UgGrMkJnkvl-qqaG3Sb8YZsjEdUIRxmB" 
                    alt="Logo" 
                    className="w-8 h-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5 mb-1">
                    <p className="text-[11px] font-bold text-nature-800 uppercase tracking-wider">Admin</p>
                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                  </div>
                  <p className="text-sm text-gray-600 font-light leading-relaxed">
                    Hi! Do you need assistance on <span className="font-semibold text-nature-900">layouts</span> and <span className="font-semibold text-nature-900">unit availability</span>?
                  </p>
                </div>
              </div>
              
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block text-center bg-[#25D366] text-white py-2 px-4 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#1ebe57] transition-colors shadow-sm active:scale-95"
              >
                Chat Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.3)] flex items-center justify-center group relative h-16 w-16"
        aria-label="Contact us on WhatsApp"
      >
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none"></span>
        
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="relative z-10"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>

        {/* Tooltip */}
        <span className="absolute right-full mr-4 bg-white text-nature-900 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-nature-100">
          Chat with us
        </span>
      </motion.a>
    </div>
  );
}
