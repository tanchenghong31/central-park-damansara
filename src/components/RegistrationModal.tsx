import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Send, ShieldCheck } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xdaydygn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          onClose();
          // Reset after success animation
          setTimeout(() => {
            setIsSuccess(false);
            setFormData({ name: '', phone: '' });
          }, 500);
        }, 2500);
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-nature-900/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl shadow-nature-900/30"
          >
            {/* Top accent bar with "Time running out" animation */}
            <div className="h-1.5 w-full bg-nature-100 overflow-hidden">
              <motion.div 
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 30, ease: "linear" }}
                className="h-full bg-[#C5A059] origin-left" 
              />
            </div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-nature-400 hover:text-nature-900 transition-colors rounded-full hover:bg-nature-50"
            >
              <X size={20} />
            </button>

            <div className="p-8 sm:p-10">
              {!isSuccess ? (
                <>
                  <div className="flex items-center space-x-2 text-[#C5A059] mb-4">
                    <Clock size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Limited Time Offer</span>
                  </div>

                  <h2 className="font-serif text-3xl text-nature-900 mb-3 tracking-tight">
                    Units are <span className="italic">Limited</span>.
                  </h2>
                  <p className="text-nature-600 text-sm font-light mb-8 leading-relaxed">
                    Petaling Jaya's most anticipated pet-friendly residences are selling fast. Register now to secure your exclusive preview.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="modal-name" className="block text-[10px] font-bold uppercase tracking-widest text-nature-900 mb-2 ml-1">
                        Full Name
                      </label>
                      <input
                        id="modal-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-5 py-3.5 bg-nature-50 border border-nature-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059]/20 focus:border-[#C5A059] transition-all placeholder:text-nature-300"
                        placeholder="e.g. John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="modal-phone" className="block text-[10px] font-bold uppercase tracking-widest text-nature-900 mb-2 ml-1">
                        Contact Number
                      </label>
                      <input
                        id="modal-phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-5 py-3.5 bg-nature-50 border border-nature-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059]/20 focus:border-[#C5A059] transition-all placeholder:text-nature-300"
                        placeholder="e.g. +6012 345 6789"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-nature-900 text-white py-4 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-nature-800 transition-all shadow-lg shadow-nature-900/10 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Register Interest</span>
                          <Send size={14} className="ml-1" />
                        </>
                      )}
                    </button>
                  </form>

                  <div className="mt-8 pt-6 border-t border-nature-50 flex items-center space-x-3 grayscale opacity-60">
                    <ShieldCheck size={18} className="text-nature-900" />
                    <span className="text-[10px] text-nature-500 tracking-wider">Your information is secure and private.</span>
                  </div>
                </>
              ) : (
                <div className="py-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <ShieldCheck size={40} />
                  </motion.div>
                  <h3 className="font-serif text-2xl text-nature-900 mb-2">Registration Successful</h3>
                  <p className="text-nature-500 text-sm font-light">
                    Our luxury concierge will contact you shortly.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationModal;
