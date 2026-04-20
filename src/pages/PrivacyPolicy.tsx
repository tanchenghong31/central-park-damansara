import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PrivacyPolicyProps {
  onNavigate: (path: string) => void;
}

export default function PrivacyPolicy({ onNavigate }: PrivacyPolicyProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResidencesOpen, setIsResidencesOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-nature-50 font-sans text-urban-900 selection:bg-nature-800 selection:text-white">
      {/* Navigation */}
      <nav className={`fixed left-0 right-0 z-50 transition-all duration-700 ease-in-out px-4 sm:px-8 pt-4 sm:pt-6 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className={`max-w-6xl mx-auto transition-all duration-500 rounded-full border border-nature-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${isMenuOpen ? 'bg-white' : 'bg-white/70 backdrop-blur-xl'}`}>
          <div className="flex justify-between items-center h-16 sm:h-20 px-6 sm:px-10">
            {/* Logo (Left) */}
            <div className="flex-shrink-0 flex items-center group cursor-pointer" onClick={() => onNavigate('/')}>
              <img 
                src="https://lh3.googleusercontent.com/d/1UgGrMkJnkvl-qqaG3Sb8YZsjEdUIRxmB" 
                alt="Central Park Damansara Logo" 
                className="h-8 sm:h-12 w-auto transform transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Desktop Navigation (Right) */}
            <div className="hidden lg:flex items-center justify-end space-x-4 xl:space-x-8">
              <button 
                onClick={() => onNavigate('/')} 
                className="text-[10px] font-bold text-nature-900/60 hover:text-nature-900 transition-all duration-300 uppercase tracking-[0.2em] hover:tracking-[0.25em]"
              >
                Home
              </button>
              <button 
                onClick={() => onNavigate('/#features')}
                className="text-[10px] font-bold text-nature-900/60 hover:text-nature-900 transition-all duration-300 uppercase tracking-[0.2em] hover:tracking-[0.25em]"
              >
                Project Features
              </button>
              
              <div className="relative group/coll py-6">
                <button className="flex items-center text-[10px] font-bold text-nature-900/60 hover:text-nature-900 transition-all duration-300 uppercase tracking-[0.2em]">
                  The Collection <ChevronDown size={12} className="ml-2 opacity-30 transition-transform group-hover/coll:rotate-180" />
                </button>
                <div className="absolute right-0 top-full w-64 bg-white/95 backdrop-blur-xl border border-nature-100 shadow-2xl opacity-0 invisible group-hover/coll:opacity-100 group-hover/coll:visible transition-all duration-500 transform -translate-y-2 group-hover/coll:translate-y-0 rounded-2xl overflow-hidden mt-2">
                  <div className="py-2">
                    <button onClick={() => onNavigate('/project/the-aldenz')} className="w-full text-left px-8 py-4 text-[9px] text-nature-900/70 hover:bg-nature-50 hover:pl-10 transition-all duration-300 uppercase tracking-[0.2em] hover:text-nature-900">The Aldenz</button>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => onNavigate('/#register')}
                className="bg-nature-900 text-white px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-nature-800 transition-all duration-500 shadow-sm hover:shadow-lg shadow-nature-900/20 active:scale-95"
              >
                Register
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-nature-900 p-2 focus:outline-none bg-nature-100/50 rounded-full"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden absolute left-4 right-4 top-24 sm:top-28 bg-white/95 backdrop-blur-2xl rounded-3xl border border-nature-100 shadow-2xl overflow-hidden z-[60]"
            >
              <div className="p-8 space-y-8">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <button 
                      onClick={() => setIsResidencesOpen(!isResidencesOpen)}
                      className="flex items-center justify-between w-full text-lg font-serif text-nature-800 uppercase tracking-widest hover:text-nature-900 transition-colors py-2"
                    >
                      <span>The Collection</span>
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-500 ${isResidencesOpen ? 'rotate-180' : 'rotate-0'}`} 
                      />
                    </button>
                    
                    <AnimatePresence>
                      {isResidencesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 space-y-4 border-l border-nature-100 mt-2 pb-2">
                            <button 
                              onClick={() => { setIsMenuOpen(false); onNavigate('/project/the-aldenz'); }}
                              className="block text-sm text-nature-500 hover:text-nature-900 uppercase tracking-widest transition-colors py-1"
                            >
                              The Aldenz
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 pt-6 border-t border-nature-100 text-base font-serif text-nature-800 uppercase tracking-widest">
                    <button onClick={() => { setIsMenuOpen(false); onNavigate('/'); }} className="text-left hover:text-nature-900 py-1 transition-colors">Home</button>
                    <button onClick={() => { setIsMenuOpen(false); onNavigate('/#features'); }} className="text-left hover:text-nature-900 py-1 transition-colors">Project Features</button>
                    <button onClick={() => { setIsMenuOpen(false); onNavigate('/#lifestyle'); }} className="text-left hover:text-nature-900 py-1 transition-colors">Lifestyle</button>
                    <button onClick={() => { setIsMenuOpen(false); onNavigate('/#location'); }} className="text-left hover:text-nature-900 py-1 transition-colors">Location</button>
                  </div>
                  
                  <div className="pt-4">
                    <button onClick={() => { setIsMenuOpen(false); onNavigate('/#register'); }} className="inline-block bg-nature-900 text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] w-full text-center shadow-lg active:scale-95 transition-transform">
                      Register Interest
                    </button>
                  </div>

                  <div className="pt-8 border-t border-nature-100 flex justify-between items-center text-[9px] text-nature-400 uppercase tracking-[0.3em] font-medium">
                    <span>Central Park Damansara</span>
                    <div className="flex space-x-4">
                      <span>FB</span>
                      <span>IG</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => onNavigate('/')}
            className="flex items-center text-nature-800 hover:text-nature-900 transition-colors mb-12 group"
          >
            <ArrowLeft size={16} className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Back to Hub</span>
          </button>

          <header className="mb-16">
            <span className="text-nature-800 text-xs font-semibold uppercase tracking-[0.4em] mb-4 block">Privacy Policy</span>
            <h1 className="font-serif text-4xl md:text-5xl text-nature-900 tracking-tight leading-tight">
              Our Commitment to <br />
              <span className="italic font-light text-nature-800/50">Your Privacy</span>
            </h1>
          </header>

          <div className="prose prose-nature max-w-none space-y-12">
            <section>
              <h2 className="text-2xl font-serif text-nature-900 border-b border-nature-100 pb-4 mb-6">Introduction</h2>
              <p className="text-gray-600 font-light leading-relaxed">
                Welcome to Central Park Damansara (centralpark-damansara.com). We value your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website or interact with our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-nature-900 border-b border-nature-100 pb-4 mb-6">Information We Collect</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl border border-nature-100 shadow-sm">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-nature-800 mb-4">Direct Information</h3>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">
                    This includes name, email address, and phone number provided when you register interest for our residential projects.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-2xl border border-nature-100 shadow-sm">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-nature-800 mb-4">Usage Data</h3>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">
                    Information about how you browse our site, including IP address, browser type, and pages visited to improve user experience.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-nature-900 border-b border-nature-100 pb-4 mb-6">How We Use Your Information</h2>
              <ul className="space-y-4 text-gray-600 font-light list-disc pl-5">
                <li>To provide you with information regarding Central Park Damansara and our new launches.</li>
                <li>To coordinate project viewings and sales consultations.</li>
                <li>To improve our website functionality and marketing efforts.</li>
                <li>To comply with legal obligations and protect our rights.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-nature-900 border-b border-nature-100 pb-4 mb-6">Data Security</h2>
              <p className="text-gray-600 font-light leading-relaxed">
                We implement a variety of security measures to maintain the safety of your personal information. Your personal data is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-nature-900 border-b border-nature-100 pb-4 mb-6">Cookies</h2>
              <p className="text-gray-600 font-light leading-relaxed">
                We use cookies to help us remember and process your preferences for future visits and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-nature-900 border-b border-nature-100 pb-4 mb-6">Contact Us</h2>
              <p className="text-gray-600 font-light leading-relaxed">
                If there are any questions regarding this privacy policy, you may contact us using the information below:
              </p>
              <div className="mt-8 p-8 bg-nature-900 text-white rounded-3xl inline-block">
                <p className="text-sm font-light mb-2 opacity-70 uppercase tracking-widest">Contact Us</p>
                <a href="tel:01169592585" className="text-xl md:text-2xl font-serif italic mb-6 block hover:text-nature-100 transition-colors">011 6959 2585</a>
                <p className="text-sm font-light mb-2 opacity-70 uppercase tracking-widest">Sales Gallery</p>
                <p className="text-sm leading-relaxed max-w-xs font-light">
                  Central Park Damansara Sales Gallery, <br />
                  Damansara Perdana, 47820 Petaling Jaya, <br />
                  Selangor, Malaysia.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-nature-700 text-white py-12 md:py-10 border-t border-nature-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
            <div className="col-span-1 md:col-span-2">
              <img 
                src="https://lh3.googleusercontent.com/d/1UgGrMkJnkvl-qqaG3Sb8YZsjEdUIRxmB" 
                alt="Central Park Damansara Logo" 
                className="h-12 w-auto mb-6 cursor-pointer brightness-0 invert"
                onClick={() => onNavigate('/')}
                referrerPolicy="no-referrer"
              />
              <p className="text-nature-100 font-light max-w-sm leading-relaxed">
                A visionary township redefining urban living through nature-inspired design and unparalleled connectivity in the heart of Damansara.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium uppercase tracking-widest mb-6 text-white">The Collection</h4>
              <ul className="space-y-4">
                <li><button onClick={() => onNavigate('/project/the-aldenz')} className="text-nature-100 hover:text-white transition-colors font-light text-sm">The Aldenz</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium uppercase tracking-widest mb-6 text-white">Explore</h4>
              <ul className="space-y-4">
                <li><button onClick={() => onNavigate('/')} className="text-nature-100 hover:text-white transition-colors font-light text-sm">Central Park Damansara</button></li>
                <li><button onClick={() => onNavigate('/#lifestyle')} className="text-nature-100 hover:text-white transition-colors font-light text-sm">Lifestyle</button></li>
                <li><button onClick={() => onNavigate('/#location')} className="text-nature-100 hover:text-white transition-colors font-light text-sm">Location</button></li>
                <li><button onClick={() => onNavigate('/#register')} className="text-nature-100 hover:text-white transition-colors font-light text-sm">Register Interest</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-nature-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-nature-100 font-light text-xs mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Central Park Damansara. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <button disabled className="text-white cursor-default font-medium text-xs border-b border-white">Privacy Policy</button>
              <button onClick={() => onNavigate('/')} className="text-nature-100 hover:text-white transition-colors font-light text-xs">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
