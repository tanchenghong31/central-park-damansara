import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, Phone, ArrowRight, Leaf, Shield, Map, ChevronDown, Maximize, Globe, PenTool, Users, PawPrint, Coffee, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const HERO_SLIDES = [
  {
    image: "https://lh3.googleusercontent.com/d/1S8O56nUr_Wjk1kpfmACYOTv25a3Davho",
    alt: "Aldenz Central Park Damansara | The last RM5xxk Luxury Condo in Petaling Jaya",
    title: "The Heart of Damansara",
    subtitle: "Unmatched connectivity in PJ's most sought-after address. Your sanctuary in the city.",
    tagline: "FROM RM5xx k",
    cta: "Explore Residences",
    target: "projects"
  },
  {
    image: "https://lh3.googleusercontent.com/d/14wRgUzK_FdMaOd5tJQB0jqXoGPB1vd9a",
    alt: "Central Park Damansara Integrated Township Waterfall Park",
    title: "Central Park Damansara",
    subtitle: "Discover PJ's premier pet-friendly community, featuring 65 acres of greenery and contemporary urban design.",
    tagline: "FROM RM5xx k",
    cta: "View Collection",
    target: "pet-friendly"
  },
  {
    image: "https://lh3.googleusercontent.com/d/1dz33dbu9z-mKJXU4e2iMgIlKxbglB54A",
    alt: "Large 3 to 4 Bedroom Unit Layouts in Petaling Jaya",
    title: "Spacious KL Homes",
    subtitle: "From practical 3-bedroom units to larger 4+1 layouts, tailored for every stage of life.",
    tagline: "FROM RM5xx k",
    cta: "Compare Layouts",
    target: "projects"
  }
];

const PROJECTS = [
  {
    id: "the-aldenz",
    name: "The Aldenz",
    desc: "Elevated prestige. Exclusive low-density living with panoramic views and pet-friendly spaces.",
    specs: "2 - 3 Beds | 775 - 926 sq.ft.",
    image: "https://lh3.googleusercontent.com/d/11WkGxXCBGpsGxOte9ED-yXQhZjl8Aerd",
    alt: "The Aldenz Luxury Service Apartment Damansara PJ"
  }
];

const GALLERY_IMAGES = [
  { 
    id: "16jvIdR6d-XootIv6Faafh2SxIOkleoJm", 
    title: "Aldenz Retail Close Up", 
    alt: "The Aldenz Retail Close Up Architecture | Luxury Mixed Development Petaling Jaya",
    span: "md:col-span-8"
  },
  { 
    id: "1J_KdWV3o2UrlH0rErE2BzhGLp0M8Zx93", 
    title: "Retails Drop off", 
    alt: "Central Park Damansara Retail Drop Off Point | Luxury Condo Entryway PJ",
    span: "md:col-span-4"
  },
  { 
    id: "15HMcNKnK3t4zUEjkN-ZvVdruIpzi6hNn", 
    title: "Aldenz Retail Street View", 
    alt: "The Aldenz Retail Street View | Vibrant Commercial Hub Central Park Damansara",
    span: "md:col-span-4"
  },
  { 
    id: "1D0GRBQP_7e2l4dTUWQKYMTObfYXpQuJ8", 
    title: "The Aldenz Retail", 
    alt: "The Aldenz Retail Lifestyle Center | Premium Shopping Destination Damansara",
    span: "md:col-span-4"
  },
  { 
    id: "1vTrfmNZ20JoTz7YR-N_wEV0_lItv5mk7", 
    title: "The Aldenz Retail High Street", 
    alt: "The Aldenz Retail High Street Walkway | Modern Urban Retail PJ",
    span: "md:col-span-4"
  },
  { 
    id: "1uN5NGmhcxp2JW2mNw7Ba7kMpxadg6bQs", 
    title: "The Aldenz Retail Shopping", 
    alt: "The Aldenz Retail Shopping Promenade | Contemporary Architecture Damansara",
    span: "md:col-span-12"
  },
  { 
    id: "1bANP133C7gpijSXfwB99DWKMvVUNMDJ5", 
    title: "Colonial Retails 1", 
    alt: "Colonial Retails Classic Architecture | Heritage Inspired Commercial Hub PJ",
    span: "md:col-span-4"
  },
  { 
    id: "1-_jkcSbAeCdBJwE92NXVuJ13POq6HNfi", 
    title: "Colonial Retails Lifestyle", 
    alt: "Colonial Retails Lifestyle Hub | Sophisticated Dining & Shopping Damansara",
    span: "md:col-span-4"
  },
  { 
    id: "16nCcyO-9pOE9mfNbg-3IOV5D-EYSCcEZ", 
    title: "Podium Facilities", 
    alt: "Central Park Damansara Podium Facilities | Infinity Pool & Luxury Amenities PJ",
    span: "md:col-span-4"
  }
];

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResidencesOpen, setIsResidencesOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
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

  useEffect(() => {
    document.title = "Central Park Damansara | Pet-Friendly Luxury Residences in PJ";
  }, []);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://formspree.io/f/mqewlyln', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert("Thank you for your interest. Our property consultant will contact you shortly.");
        (e.target as HTMLFormElement).reset();
      } else {
        alert("Oops! There was a problem submitting your form. Please try again later.");
      }
    } catch (error) {
      alert("Oops! There was a problem submitting your form. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-nature-50 font-sans text-urban-900 selection:bg-nature-800 selection:text-white">
      {/* Navigation */}
      <nav className={`fixed left-0 right-0 z-50 transition-all duration-700 ease-in-out px-4 sm:px-8 pt-4 sm:pt-6 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className={`max-w-6xl mx-auto transition-all duration-500 rounded-full border border-nature-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${isMenuOpen ? 'bg-white' : 'bg-white/70 backdrop-blur-xl'}`}>
          <div className="flex justify-between items-center h-16 sm:h-20 px-6 sm:px-10">
            {/* Logo (Left) */}
            <div className="flex-shrink-0 flex items-center group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img 
                src="https://lh3.googleusercontent.com/d/1UgGrMkJnkvl-qqaG3Sb8YZsjEdUIRxmB" 
                alt="Central Park Damansara Logo" 
                className="h-8 sm:h-12 w-auto transform transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Desktop Navigation (Right) */}
            <div className="hidden lg:flex items-center justify-end space-x-4 xl:space-x-8">
              <a href="#lifestyle" className="text-[10px] font-bold text-nature-900/60 hover:text-nature-900 transition-all duration-300 uppercase tracking-[0.2em] hover:tracking-[0.25em]">Lifestyle</a>
              <a href="#pet-friendly" className="text-[10px] font-bold text-nature-900/60 hover:text-nature-900 transition-all duration-300 uppercase tracking-[0.2em] hover:tracking-[0.25em]">Pet Friendly</a>
              <a href="#gallery" className="text-[10px] font-bold text-nature-900/60 hover:text-nature-900 transition-all duration-300 uppercase tracking-[0.2em] hover:tracking-[0.25em]">Gallery</a>
              <a href="#location" className="text-[10px] font-bold text-nature-900/60 hover:text-nature-900 transition-all duration-300 uppercase tracking-[0.2em] hover:tracking-[0.25em]">Location</a>
              <a href="#features" className="text-[10px] font-bold text-nature-900/60 hover:text-nature-900 transition-all duration-300 uppercase tracking-[0.2em] hover:tracking-[0.25em]">Project Features</a>
              
              <div className="relative group/coll py-6">
                <a href="#collection" className="flex items-center text-[10px] font-bold text-nature-900/60 hover:text-nature-900 transition-all duration-300 uppercase tracking-[0.2em]">
                  The Collection <ChevronDown size={12} className="ml-2 opacity-30 transition-transform group-hover/coll:rotate-180" />
                </a>
                <div className="absolute right-0 top-full w-64 bg-white/95 backdrop-blur-xl border border-nature-100 shadow-2xl opacity-0 invisible group-hover/coll:opacity-100 group-hover/coll:visible transition-all duration-500 transform -translate-y-2 group-hover/coll:translate-y-0 rounded-2xl overflow-hidden mt-2">
                  <div className="py-2">
                    <button onClick={() => onNavigate('/project/the-aldenz')} className="w-full text-left px-8 py-4 text-[9px] text-nature-900/70 hover:bg-nature-50 hover:pl-10 transition-all duration-300 uppercase tracking-[0.2em] hover:text-nature-900">The Aldenz</button>
                  </div>
                </div>
              </div>

              <a 
                href="https://wa.me/601111697251?text=%5BCPD%5D%20Hi%2C%20I%20am%20interested%20in%20Central%20Park%20Damansara.%20Send%20me%20Upcoming%20project%20details.%0A%0AMy%20name%20is" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-nature-900 text-white px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-nature-800 transition-all duration-500 shadow-sm hover:shadow-lg shadow-nature-900/20 active:scale-95"
              >
                Register
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className={`p-2 transition-transform duration-500 ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`}
              >
                {isMenuOpen ? (
                  <div className="w-8 h-8 flex items-center justify-center bg-nature-900 text-white rounded-full">
                    <X size={20} strokeWidth={1.5} />
                  </div>
                ) : (
                  <div className="w-8 h-8 flex items-center justify-center bg-nature-50 text-nature-900 rounded-full border border-nature-200">
                    <Menu size={20} strokeWidth={1.5} />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden absolute top-24 left-4 right-4 z-40 max-h-[80vh] overflow-y-auto no-scrollbar"
            >
              <div className="bg-white/95 backdrop-blur-2xl rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] border border-nature-100 p-6 sm:p-10">
                <div className="flex flex-col space-y-8">
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
                    <AnimatePresence mode="wait">
                      {isResidencesOpen && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden border-l border-nature-100 ml-2"
                        >
                          <div className="grid grid-cols-1 gap-2 pl-6 pt-2">
                            <button onClick={() => {setIsMenuOpen(false); onNavigate('/project/the-aldenz')}} className="text-left py-2 group">
                              <span className="text-2xl sm:text-3xl font-serif text-nature-900 group-hover:text-nature-600 transition-colors">The Aldenz</span>
                              <div className="h-px w-0 group-hover:w-full bg-nature-200 transition-all duration-500 mt-1"></div>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 pt-6 border-t border-nature-100 text-base font-serif text-nature-800 uppercase tracking-widest">
                    <a href="#features" onClick={() => setIsMenuOpen(false)} className="hover:text-nature-900 py-1 transition-colors">Project Features</a>
                    <a href="#lifestyle" onClick={() => setIsMenuOpen(false)} className="hover:text-nature-900 py-1 transition-colors">Lifestyle</a>
                    <a href="#pet-friendly" onClick={() => setIsMenuOpen(false)} className="hover:text-nature-900 py-1 transition-colors">Pet Friendly</a>
                    <a href="#gallery" onClick={() => setIsMenuOpen(false)} className="hover:text-nature-900 py-1 transition-colors">Gallery</a>
                    <a href="#location" onClick={() => setIsMenuOpen(false)} className="hover:text-nature-900 py-1 transition-colors">Location</a>
                  </div>
                  
                  <div className="pt-4">
                    <a 
                      href="https://wa.me/601111697251?text=%5BCPD%5D%20Hi%2C%20I%20am%20interested%20in%20Central%20Park%20Damansara.%20Send%20me%20Upcoming%20project%20details.%0A%0AMy%20name%20is" 
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMenuOpen(false)} 
                      className="inline-block bg-nature-900 text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] w-full text-center shadow-lg active:scale-95 transition-transform"
                    >
                      Register Interest
                    </a>
                  </div>

                  <div className="pt-8 border-t border-nature-100 flex justify-between items-center text-[9px] text-nature-400 uppercase tracking-[0.3em] font-medium">
                    <span>Central Park Damansara</span>
                    <div className="flex space-x-4">
                      <a href="tel:+601111697251" className="hover:text-nature-900 transition-colors">
                        <Phone size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {HERO_SLIDES.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-nature-950/90 via-nature-950/70 to-nature-950/90 backdrop-blur-[2px] z-10" />
              <img 
                src={slide.image} 
                alt={(slide as any).alt || slide.title}
                className="absolute inset-0 w-full h-full object-cover brightness-[0.65]"
                referrerPolicy="no-referrer"
              />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 pt-20">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={index === currentSlide ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white text-sm sm:text-base font-bold uppercase tracking-[0.4em] mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,1)]"
              >
                {slide.tagline}
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={index === currentSlide ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-medium mb-6 drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] max-w-5xl leading-tight tracking-tight"
              >
                {slide.title}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={index === currentSlide ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-white text-lg md:text-2xl max-w-3xl font-medium drop-shadow-[0_4px_16px_rgba(0,0,0,1)] mb-10 leading-relaxed"
              >
                {slide.subtitle}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={index === currentSlide ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <button 
                  onClick={() => document.getElementById((slide as any).target)?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-nature-900 px-10 py-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-nature-900 hover:text-white transition-all duration-500 shadow-2xl active:scale-95"
                >
                  {slide.cta}
                </button>
                <button 
                  onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-transparent border border-white text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-nature-900 transition-all duration-500 active:scale-95"
                >
                  Register Interest
                </button>
              </motion.div>
            </div>
          </div>
        ))}
        
        {/* Slider Controls */}
        <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center space-x-3">
          {HERO_SLIDES.map((_, index) => (
            <button 
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-12 h-1 transition-all duration-300 ${index === currentSlide ? 'bg-white' : 'bg-white/40 hover:bg-white/60'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Key Highlights Section */}
      <section id="features" className="py-20 bg-white border-y border-nature-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
            <div className="text-center group">
              <div className="w-14 h-14 mx-auto bg-nature-50 rounded-full flex items-center justify-center mb-5 group-hover:bg-nature-100 transition-colors duration-300 border border-nature-100">
                <Maximize className="text-nature-800" size={24} strokeWidth={1.5} />
              </div>
              <h4 className="text-base lg:text-lg font-serif mb-3 tracking-wide text-nature-900 uppercase">Spacious Layouts</h4>
              <p className="text-gray-500 text-xs lg:text-sm font-light leading-relaxed max-w-[200px] mx-auto">Larger units with 3 to 4+1 bedroom options.</p>
            </div>
            <div className="text-center group">
              <div className="w-14 h-14 mx-auto bg-nature-50 rounded-full flex items-center justify-center mb-5 group-hover:bg-nature-100 transition-colors duration-300 border border-nature-100">
                <Globe className="text-nature-800" size={24} strokeWidth={1.5} />
              </div>
              <h4 className="text-base lg:text-lg font-serif mb-3 tracking-wide text-nature-900 uppercase">Integrated Township</h4>
              <p className="text-gray-500 text-xs lg:text-sm font-light leading-relaxed max-w-[200px] mx-auto">65-acre community with homes, retail, and lifestyle.</p>
            </div>
            <div className="text-center group">
              <div className="w-14 h-14 mx-auto bg-nature-50 rounded-full flex items-center justify-center mb-5 group-hover:bg-nature-100 transition-colors duration-300 border border-nature-100">
                <PenTool className="text-nature-800" size={24} strokeWidth={1.5} />
              </div>
              <h4 className="text-base lg:text-lg font-serif mb-3 tracking-wide text-nature-900 uppercase">Flexible Design</h4>
              <p className="text-gray-500 text-xs lg:text-sm font-light leading-relaxed max-w-[200px] mx-auto">Customisable layouts to suit your needs.</p>
            </div>
            <div className="text-center group">
              <div className="w-14 h-14 mx-auto bg-nature-50 rounded-full flex items-center justify-center mb-5 group-hover:bg-nature-100 transition-colors duration-300 border border-nature-100">
                <Users className="text-nature-800" size={24} strokeWidth={1.5} />
              </div>
              <h4 className="text-base lg:text-lg font-serif mb-3 tracking-wide text-nature-900 uppercase">Family-Friendly</h4>
              <p className="text-gray-500 text-xs lg:text-sm font-light leading-relaxed max-w-[200px] mx-auto">Parks and open spaces for active living.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Township Comparison Section */}
      <section className="py-24 lg:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 lg:mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#C5A059] text-[10px] lg:text-xs font-semibold uppercase tracking-[0.4em] mb-4 lg:mb-6 block">The Masterplan</span>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-8xl text-nature-900 tracking-tighter leading-[0.9] mb-8">
              The <span className="italic font-light text-nature-800/60">Desa Park City</span> <br className="hidden md:block" /> 
              of Damansara
            </h2>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full relative overflow-hidden shadow-2xl mb-16 lg:mb-24"
        >
          <img 
            src="https://lh3.googleusercontent.com/d/1lcmwDT6Y0GtW0ReJ9MhuK_AIBdKLKp9N" 
            alt="Aerial View of Central Park Damansara Township with Skyscrapers and Greenery" 
            className="w-full h-auto block"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-16 lg:mb-24 px-4"
          >
            <p className="text-gray-600 font-light text-lg lg:text-2xl leading-relaxed italic border-x border-[#C5A059]/30 px-6 lg:px-12">
              "Experience a visionary 65-acre integrated township designed for those who seek the perfect balance between nature and urbanity."
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 items-start border-t border-nature-100 pt-16 lg:pt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center md:text-left"
            >
              <span className="text-[#C5A059] text-[10px] uppercase tracking-[0.4em] font-semibold mb-4 block">The Vision</span>
              <h3 className="font-serif text-2xl text-nature-900 mb-4">Integrated Community</h3>
              <p className="text-gray-500 font-light text-sm lg:text-base leading-relaxed">
                Just as Desa Park City redefined community living, Central Park Damansara brings that same world-class standard to the heart of PJ.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center md:text-left"
            >
              <span className="text-[#C5A059] text-[10px] uppercase tracking-[0.4em] font-semibold mb-4 block">The scale</span>
              <h3 className="font-serif text-2xl text-nature-900 mb-4">65-Acre Masterplan</h3>
              <p className="text-gray-500 font-light text-sm lg:text-base leading-relaxed">
                A meticulously planned ecosystem where residential, commercial, and retail spaces coexist in perfect harmony.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center md:text-left"
            >
              <span className="text-[#C5A059] text-[10px] uppercase tracking-[0.4em] font-semibold mb-4 block">The soul</span>
              <h3 className="font-serif text-2xl text-nature-900 mb-4">Pet-Friendly Sanctuary</h3>
              <p className="text-gray-500 font-light text-sm lg:text-base leading-relaxed">
                Abundant parks and open spaces designed for your entire family, including your furry companions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Central Park Gallery Section */}
      <section id="gallery" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-nature-800 text-xs font-semibold uppercase tracking-[0.4em] mb-4 block">The Vision</span>
              <h2 className="font-serif text-4xl md:text-6xl text-nature-900 tracking-tight leading-[1.1]">
                Integrated <br />
                <span className="italic font-light text-nature-800/50 underline decoration-nature-100 underline-offset-8">Lifestyle Hub</span>
              </h2>
            </div>
            <p className="text-gray-500 font-light max-w-sm leading-relaxed pb-2">
              Discover the perfect harmony of residential serenity and vibrant commercial energy. A curated collection of retail and leisure spaces at your doorstep.
            </p>
          </div>

          {/* Desktop Grid (Hidden on Mobile) */}
          <div className="hidden md:grid grid-cols-12 gap-4 auto-rows-[300px]">
            {GALLERY_IMAGES.map((img, i) => (
              <motion.div 
                key={img.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className={`${img.span} relative group overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-500 rounded-sm`}
                onClick={() => setSelectedImage(`https://lh3.googleusercontent.com/d/${img.id}`)}
              >
                <div className="absolute inset-0 bg-nature-900/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
                <img 
                  src={`https://lh3.googleusercontent.com/d/${img.id}`} 
                  alt={img.alt} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-6 left-6 z-20 overflow-hidden">
                  <p className="text-white text-[10px] uppercase tracking-[0.3em] font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 bg-nature-900/40 backdrop-blur-sm px-3 py-1">
                    {img.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Carousel (Visible only on Mobile) */}
          <div className="md:hidden">
            <div className="flex overflow-x-auto gap-4 scroll-smooth snap-x snap-mandatory no-scrollbar pb-8 -mx-4 px-4">
              {GALLERY_IMAGES.map((img, i) => (
                <div 
                  key={img.id} 
                  className="flex-shrink-0 w-[85vw] aspect-[4/5] relative rounded-3xl overflow-hidden snap-center shadow-lg"
                  onClick={() => setSelectedImage(`https://lh3.googleusercontent.com/d/${img.id}`)}
                >
                  <img 
                    src={`https://lh3.googleusercontent.com/d/${img.id}`} 
                    alt={img.alt} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6">
                    <p className="text-white text-[10px] uppercase tracking-[0.4em] font-black">{img.title}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-2">
              <span className="text-[10px] uppercase tracking-[0.3em] font-black text-nature-800/40">Swipe to Explore</span>
            </div>
          </div>
        </div>

        {/* Lightbox / Immersive View */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-nature-950/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
              onClick={() => setSelectedImage(null)}
            >
              <motion.button 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-8 right-8 text-white hover:text-nature-200 transition-colors z-[110]"
              >
                <X size={40} strokeWidth={1} />
              </motion.button>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative max-w-7xl w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={selectedImage} 
                  alt="Gallery Highlight" 
                  className="max-w-full max-h-full object-contain shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Why Central Park Damansara */}
      <section id="lifestyle" className="py-24 bg-[#F9F7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-nature-800 text-xs font-semibold uppercase tracking-[0.4em] mb-4 block">The Masterplan</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-nature-900 mb-8 tracking-tight leading-tight">A New Standard of Living</h2>
            <div className="w-20 h-px bg-nature-800 mx-auto mb-8"></div>
            <p className="text-gray-600 font-light leading-relaxed text-lg">
              Discover a meticulously planned township that seamlessly blends the vibrancy of urban life with the tranquility of nature.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-nature-200/60">
            <div className="group pt-12 md:pt-16 md:px-8 border-b md:border-b-0 md:border-r border-nature-200/60 pb-12 md:pb-0">
              <div className="aspect-[4/5] overflow-hidden mb-8 relative">
                <div className="absolute inset-0 border border-white/20 z-10 m-4"></div>
                <img 
                  src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80" 
                  alt="Waterfall Park" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left">
                <span className="text-[10px] text-nature-800 uppercase tracking-[0.3em] mb-3 block font-semibold">Nature</span>
                <h3 className="text-2xl font-serif text-nature-900 mb-4">10-Acre Waterfall Park</h3>
                <p className="text-gray-500 font-light text-sm leading-relaxed">Your daily retreat. A sprawling green oasis featuring a cascading waterfall right at your doorstep.</p>
              </div>
            </div>
            <div className="group pt-12 md:pt-16 md:px-8 border-b md:border-b-0 md:border-r border-nature-200/60 pb-12 md:pb-0">
              <div 
                className="aspect-[4/5] overflow-hidden mb-8 relative cursor-zoom-in group/zoom"
                onClick={() => setSelectedImage("https://lh3.googleusercontent.com/d/1ZlYan8s3GdaPDNu1XcQGfen2evYrsvi6")}
              >
                <div className="absolute inset-0 border border-white/20 z-10 m-4"></div>
                <div className="absolute top-6 right-6 z-20 bg-white/90 backdrop-blur-md p-2 rounded-full opacity-0 group-hover/zoom:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/zoom:translate-y-0 shadow-lg">
                  <Maximize size={16} className="text-nature-900" />
                </div>
                <img 
                  src="https://lh3.googleusercontent.com/d/1ZlYan8s3GdaPDNu1XcQGfen2evYrsvi6" 
                  alt="Prime Connectivity Map | Central Park Damansara Accessibility Petaling Jaya" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left">
                <span className="text-[10px] text-nature-800 uppercase tracking-[0.3em] mb-3 block font-semibold">Location</span>
                <h3 className="text-2xl font-serif text-nature-900 mb-4">Prime Connectivity</h3>
                <p className="text-gray-500 font-light text-sm leading-relaxed">Seamlessly connected to LDP, Penchala Link, and DASH highways. Minutes away from 1 Utama and IKEA.</p>
              </div>
            </div>
            <div className="group pt-12 md:pt-16 md:px-8 pb-12 md:pb-0">
              <div className="aspect-[4/5] overflow-hidden mb-8 relative">
                <div className="absolute inset-0 border border-white/20 z-10 m-4"></div>
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" 
                  alt="Integrated Township" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left">
                <span className="text-[10px] text-nature-800 uppercase tracking-[0.3em] mb-3 block font-semibold">Community</span>
                <h3 className="text-2xl font-serif text-nature-900 mb-4">Integrated Township</h3>
                <p className="text-gray-500 font-light text-sm leading-relaxed">A self-sustaining ecosystem of residential, commercial, and retail spaces designed for absolute convenience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Status & Future Projects CTA */}
      <section id="collection" className="py-24 bg-nature-900 text-white overflow-hidden relative">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-nature-800/20 skew-x-12 translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-nature-100 text-xs font-semibold uppercase tracking-[0.4em] mb-6 block">The Residences</span>
              <h2 className="font-serif text-4xl md:text-5xl mb-8 tracking-tight leading-tight">The Collection</h2>
              <p className="text-nature-100/80 font-light mb-10 leading-relaxed text-lg max-w-xl">
                Central Park Damansara is a rapidly evolving 65-acre masterplan. While many phases have found their owners, new opportunities await those seeking a refined urban lifestyle.
              </p>
              
              <div className="space-y-10">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 lg:p-10 rounded-sm shadow-inner">
                  <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-nature-100">Current Availability</h4>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nature-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-nature-500"></span>
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-x-12">
                    <button 
                      onClick={() => onNavigate('/project/the-aldenz')}
                      className="flex justify-between items-center group border-b border-white/5 pb-2 hover:border-white/30 transition-all duration-300"
                    >
                      <span className="text-base font-medium tracking-wide group-hover:translate-x-1 transition-transform">The Aldenz</span>
                      <span className="text-[10px] px-4 py-1.5 bg-white text-nature-900 rounded-full uppercase font-black tracking-widest shadow-lg group-hover:scale-105 transition-transform animate-pulse">New Launch</span>
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-semibold uppercase tracking-[0.4em] text-nature-100/40 mb-6 flex items-center">
                    <span className="w-8 h-px bg-white/10 mr-4"></span>
                    Fully Sold Out Phases
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {['D’Terra', 'D’Tessera', 'D’Quince', 'D’Vervain', 'D’Cosmos', 'D’Vine', 'D’Erica', 'D’Clover'].map((sold) => (
                      <div key={sold} className="relative group overflow-hidden">
                        <div className="px-4 py-3 bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.2em] text-nature-100/60 transition-all duration-300 group-hover:bg-white/10 flex flex-col gap-1">
                          <span className="font-medium text-nature-100/80">{sold}</span>
                          <span className="text-[9px] text-red-400/80 font-bold flex items-center">
                            <span className="w-1 h-1 bg-red-500 rounded-full mr-1.5"></span>
                            Sold Out
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 lg:p-16 text-nature-900 shadow-2xl relative">
              <div className="absolute top-0 left-0 w-2 h-full bg-nature-800"></div>
              <h3 className="font-serif text-3xl mb-6 tracking-tight">Register for Priority Access</h3>
              <p className="text-gray-500 font-light mb-8 leading-relaxed">
                Be the first to receive exclusive updates, floor plans, and early bird privileges for our highly anticipated future residential launches and remaining units.
              </p>
              <a 
                href="https://wa.me/601111697251?text=%5BCPD%5D%20Hi%2C%20I%20am%20interested%20in%20Central%20Park%20Damansara.%20Send%20me%20Upcoming%20project%20details.%0A%0AMy%20name%20is" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center bg-nature-900 text-white px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] hover:bg-nature-800 transition-colors duration-300"
              >
                Secure Your Priority Spot
              </a>
              <p className="text-[10px] text-gray-400 mt-6 text-center italic uppercase tracking-widest">Limited slots available for upcoming phases</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-nature-50 border-y border-nature-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-nature-800 text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">Project Status</span>
            <h2 className="font-serif text-4xl md:text-5xl text-nature-900 mb-6 tracking-tight">The Vision <br/><span className="italic font-light text-nature-800/60">Continues</span></h2>
            <p className="text-gray-500 font-light leading-relaxed">
              Explore our diverse portfolio of premium residences, each thoughtfully designed to cater to different lifestyle needs.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl w-full">
              {PROJECTS.map((project) => (
                <div key={project.id} className="group bg-white border border-nature-100 overflow-hidden hover:border-nature-800 transition-all duration-500 flex flex-col">
                  <div 
                    className="relative h-72 overflow-hidden cursor-pointer"
                    onClick={() => onNavigate(`/project/${project.id}`)}
                  >
                    <div className="absolute inset-0 bg-nature-900/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <img 
                      src={project.image} 
                      alt={(project as any).alt || project.name} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 z-20">
                      <span className="text-[10px] px-3 py-1 bg-nature-900 text-white font-bold uppercase tracking-widest rounded-full">Active Launch</span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-serif text-nature-900 mb-2">{project.name}</h3>
                    <p className="text-nature-800 font-medium text-sm mb-4 tracking-wide">{project.specs}</p>
                    <p className="text-gray-500 font-light text-sm mb-8 leading-relaxed line-clamp-3">{project.desc}</p>
                    <div className="mt-auto">
                      <button 
                        onClick={() => onNavigate(`/project/${project.id}`)}
                        className="inline-flex items-center text-sm font-medium text-nature-900 uppercase tracking-widest group-hover:text-nature-700 transition-colors"
                      >
                        Discover {project.name} <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Future Projects Card */}
              <div className="group bg-nature-50 border border-nature-100 overflow-hidden hover:border-nature-800 transition-all duration-500 relative flex flex-col">
                <div className="relative h-72 overflow-hidden bg-nature-200">
                  <div className="absolute inset-0 bg-nature-900/40 z-10" />
                  <img 
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" 
                    alt="Future Development" 
                    className="w-full h-full object-cover grayscale opacity-60 transform group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <div className="text-center px-6">
                      <span className="text-white/60 text-[10px] uppercase tracking-[0.4em] mb-2 block">Coming Soon</span>
                      <h4 className="text-white text-3xl font-serif">Future <br/>Phases</h4>
                    </div>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-serif text-nature-900 mb-2 italic opacity-60">Upcoming Residences</h3>
                  <p className="text-nature-800 font-medium text-sm mb-4 tracking-wide">Signature Collections</p>
                  <p className="text-gray-400 font-light text-sm mb-8 leading-relaxed">
                    The evolution of Central Park Damansara continues. New exclusive residential phases are currently in planning. 
                  </p>
                  <div className="mt-auto">
                    <a 
                      href="#register"
                      className="inline-flex items-center text-sm font-medium text-nature-800 uppercase tracking-widest hover:text-nature-900 transition-colors"
                    >
                      Register for Updates <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>

      {/* Pet Friendly Section Highlights */}
      <section id="pet-friendly" className="py-20 lg:py-32 bg-[#f4f7f2] overflow-hidden relative">
        {/* Dynamic Background Accents */}
        <div className="absolute top-0 right-0 w-[400px] lg:w-[800px] h-[400px] lg:h-[800px] bg-nature-100/40 rounded-full blur-[100px] lg:blur-[150px] -translate-y-1/2 translate-x-1/2 opacity-80" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-nature-700/5 rounded-full blur-[80px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-24">
            {/* Image Composition */}
            <div className="w-full lg:w-1/2 relative order-1">
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Main Image with refined frame */}
                <div className="relative z-10 p-2 lg:p-4 bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] lg:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] rounded-[2rem] lg:rounded-[2.5rem] border border-nature-50">
                  <img 
                    src="https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=1200&q=90" 
                    alt="Pet Friendly Community" 
                    className="w-full h-[350px] lg:h-[500px] object-cover rounded-[1.5rem] lg:rounded-[1.8rem]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Floating "Cafe" Card - Simplified for mobile */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute -bottom-6 -right-2 lg:-bottom-10 lg:-right-12 z-20 bg-nature-900 text-white p-5 lg:p-8 rounded-2xl lg:rounded-3xl shadow-2xl max-w-[200px] lg:max-w-[280px]"
                >
                  <div className="flex items-center space-x-3 lg:space-x-4 mb-2 lg:mb-4">
                    <div className="w-8 h-8 lg:w-12 lg:h-12 bg-white/10 backdrop-blur-md rounded-xl lg:rounded-2xl flex items-center justify-center border border-white/20">
                      <Coffee size={18} className="lg:text-[24px] text-nature-100" />
                    </div>
                    <div>
                      <p className="text-[8px] lg:text-[10px] font-black uppercase tracking-[0.2em] lg:tracking-[0.3em] text-white/50">Social</p>
                      <p className="text-sm lg:text-lg font-serif italic text-white">Pet Cafe</p>
                    </div>
                  </div>
                  <p className="hidden lg:block text-xs text-white/70 font-light leading-relaxed">
                    A curated space designed for social connections, where you and your pets are always at home.
                  </p>
                </motion.div>
              </motion.div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-1/2 order-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center space-x-4 mb-4 lg:mb-6">
                  <div className="w-8 h-px bg-nature-200" />
                  <span className="text-nature-800 text-[10px] font-black uppercase tracking-[0.4em]">
                    Inclusive Living
                  </span>
                </div>
                
                <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-nature-900 mb-6 lg:mb-8 tracking-tight leading-[1.1] lg:leading-[1.05]">
                  A Sanctuary for <br className="hidden sm:block" />
                  <span className="italic font-light text-nature-800/60">Every </span> 
                  Family Member
                </h2>
                
                <p className="text-gray-500 font-light text-base lg:text-xl mb-8 lg:mb-12 leading-relaxed max-w-xl">
                  Experience a township that honors the bond between you and your pets. From dedicated trails to social hubs, harmony is woven into every detail.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10 mb-8 lg:mb-12">
                  <div className="group border-l border-nature-100 pl-6 py-1">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-nature-900 mb-2 flex items-center">
                      <PawPrint size={14} className="mr-3 text-nature-800" />
                      Pet Sanctuary
                    </h4>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      Secure, beautifully themed parks designed for exploration.
                    </p>
                  </div>
                  
                  <div className="group border-l border-nature-100 pl-6 py-1">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-nature-900 mb-2 flex items-center">
                      <Leaf size={14} className="mr-3 text-nature-800" />
                      Central Forest
                    </h4>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      Direct access to the 65-acre central greenery.
                    </p>
                  </div>
                </div>
                
                <div className="pt-8 border-t border-nature-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-start gap-3">
                    <Globe size={14} className="text-nature-400 mt-1" />
                    <p className="text-nature-900 text-[11px] lg:text-sm font-medium italic max-w-xs">
                      "A community that truly prioritizes the lifestyle of pet owners in PJ."
                    </p>
                  </div>
                  <button 
                    onClick={() => onNavigate('/project/the-aldenz')}
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-nature-900 border-b border-nature-800 pb-1 self-start sm:self-center transition-all hover:pr-4"
                  >
                    View The Aldenz
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Map */}
      <section id="location" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-nature-800 text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">Location</span>
              <h2 className="font-serif text-4xl md:text-5xl text-nature-900 mb-8 tracking-tight">The Center of It All</h2>
              <p className="text-gray-500 font-light mb-8 leading-relaxed">
                Strategically located in Damansara, enjoy unparalleled access to major highways, premium shopping destinations, and top-tier educational institutions.
              </p>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <MapPin className="text-nature-800 mr-4 mt-1 flex-shrink-0" size={20} strokeWidth={1.5} />
                  <div>
                    <h4 className="font-medium text-nature-900 uppercase tracking-wider text-sm mb-1">Retail Therapy</h4>
                    <p className="text-gray-500 font-light text-sm">5 mins to 1 Utama, 7 mins to IKEA & The Curve</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <MapPin className="text-nature-800 mr-4 mt-1 flex-shrink-0" size={20} strokeWidth={1.5} />
                  <div>
                    <h4 className="font-medium text-nature-900 uppercase tracking-wider text-sm mb-1">Connectivity</h4>
                    <p className="text-gray-500 font-light text-sm">Direct access to LDP, Penchala Link, and DASH</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="h-[500px] border border-nature-100 relative overflow-hidden group shadow-2xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.696160350711!2d101.6094!3d3.1678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc49195b000001%3A0x3f3d7c71d6f51f5!2sCentral%20Park%20Damansara%20Sales%20Gallery!5e0!3m2!1sen!2smy!4v1713580551000!5m2!1sen!2smy"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Central Park Damansara Pinpoint"
                className="grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Register Interest Form */}
      <section id="register" className="py-16 lg:py-24 bg-nature-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            <div>
              <span className="text-nature-100 text-[10px] lg:text-xs font-semibold uppercase tracking-[0.3em] mb-2 lg:mb-4 block">Get in Touch</span>
              <h2 className="font-serif text-3xl lg:text-5xl mb-4 lg:mb-6 tracking-tight">Register Your Interest</h2>
              <p className="text-nature-100 font-light text-sm lg:text-lg mb-6 lg:mb-12 leading-relaxed max-w-md">
                Be the first to receive exclusive updates, floor plans, and early bird privileges for Central Park Damansara.
              </p>
              
              <div className="space-y-4 lg:space-y-8">
                <div className="flex items-center">
                  <a href="tel:+601111697251" className="flex items-center group">
                    <Phone className="text-nature-100 mr-4 lg:mr-6 group-hover:text-white transition-colors" size={20} strokeWidth={1.5} />
                    <div>
                      <p className="text-[10px] lg:text-sm text-nature-100 uppercase tracking-widest mb-0.5 lg:mb-1">Call Us</p>
                      <p className="text-base lg:text-lg font-light group-hover:text-white transition-colors">+6011 1169 7251</p>
                    </div>
                  </a>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-px h-10 bg-[#C5A059]/30"></div>
                  <p className="text-[10px] lg:text-[11px] font-medium text-[#C5A059]/80 uppercase tracking-[0.4em] leading-relaxed max-w-[200px]">
                    Last chance to grab RM5xxk condo in PJ
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 lg:p-10">
              <form onSubmit={handleRegisterSubmit} className="space-y-4 lg:space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-[10px] lg:text-[11px] font-medium text-nature-900 uppercase tracking-widest mb-1">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      required
                      className="w-full border-b border-nature-100 bg-transparent py-2 text-urban-900 focus:outline-none focus:border-nature-800 transition-colors placeholder-gray-300 font-light text-sm"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-[10px] lg:text-[11px] font-medium text-nature-900 uppercase tracking-widest mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      required
                      className="w-full border-b border-nature-100 bg-transparent py-2 text-urban-900 focus:outline-none focus:border-nature-800 transition-colors placeholder-gray-300 font-light text-sm"
                      placeholder="+6012 345 6789"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <label htmlFor="email" className="block text-[10px] lg:text-[11px] font-medium text-nature-900 uppercase tracking-widest mb-1">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      required
                      className="w-full border-b border-nature-100 bg-transparent py-2 text-urban-900 focus:outline-none focus:border-nature-800 transition-colors placeholder-gray-300 font-light text-sm"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="project" className="block text-[10px] lg:text-[11px] font-medium text-nature-900 uppercase tracking-widest mb-1">Project of Interest</label>
                    <select 
                      id="project" 
                      name="project"
                      required
                      className="w-full border-b border-nature-100 bg-transparent py-2 text-urban-900 focus:outline-none focus:border-nature-800 transition-colors font-light appearance-none text-sm"
                    >
                      <option value="the-aldenz">The Aldenz (New Launch)</option>
                      <option value="future">Upcoming Future Launches</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <label htmlFor="bedrooms" className="block text-[10px] lg:text-[11px] font-medium text-nature-900 uppercase tracking-widest mb-1">Number of Bedrooms</label>
                    <select 
                      id="bedrooms" 
                      name="bedrooms"
                      required
                      className="w-full border-b border-nature-100 bg-transparent py-2 text-urban-900 focus:outline-none focus:border-nature-800 transition-colors font-light appearance-none text-sm"
                    >
                      <option value="">Select Option</option>
                      <option value="2">2 Bedrooms</option>
                      <option value="3">3 Bedrooms</option>
                      <option value="4+">4+ Bedrooms</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="purpose" className="block text-[10px] lg:text-[11px] font-medium text-nature-900 uppercase tracking-widest mb-1">Purpose of Purchase</label>
                    <select 
                      id="purpose" 
                      name="purpose"
                      required
                      className="w-full border-b border-nature-100 bg-transparent py-2 text-urban-900 focus:outline-none focus:border-nature-800 transition-colors font-light appearance-none text-sm"
                    >
                      <option value="">Select Option</option>
                      <option value="own-stay">Own Stay</option>
                      <option value="investment">Investment</option>
                    </select>
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full border border-nature-800 bg-nature-800 text-white py-3 lg:py-3.5 text-xs lg:text-sm font-medium uppercase tracking-[0.2em] hover:bg-white hover:text-nature-900 transition-colors duration-300 mt-2 lg:mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-nature-700 text-white py-12 md:py-10 border-t border-nature-800 min-h-[100dvh] md:min-h-0 flex flex-col justify-between">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
            <div className="col-span-1 md:col-span-2">
              <img 
                src="https://lh3.googleusercontent.com/d/1UgGrMkJnkvl-qqaG3Sb8YZsjEdUIRxmB" 
                alt="Central Park Damansara Logo" 
                className="h-12 w-auto mb-6 cursor-pointer brightness-0 invert"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
                <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-nature-100 hover:text-white transition-colors font-light text-sm">Central Park Damansara</button></li>
                <li><a href="#lifestyle" className="text-nature-100 hover:text-white transition-colors font-light text-sm">Lifestyle</a></li>
                <li><a href="#location" className="text-nature-100 hover:text-white transition-colors font-light text-sm">Location</a></li>
                <li><a href="#register" className="text-nature-100 hover:text-white transition-colors font-light text-sm">Register Interest</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-nature-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-nature-100 font-light text-xs mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Central Park Damansara. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <button 
                onClick={() => onNavigate('/privacy-policy')}
                className="text-nature-100 hover:text-white transition-colors font-light text-xs"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => onNavigate('/terms-of-service')}
                className="text-nature-100 hover:text-white transition-colors font-light text-xs"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
