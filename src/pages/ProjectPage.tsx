import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, ChevronUp, MapPin, ArrowLeft, 
  TreePine, Shield, Smartphone, Leaf, 
  Building2, Laptop, Sun, Trash2, 
  Crown, Key, Diamond, BellRing, PawPrint, Coffee,
  ChevronLeft, ChevronRight, Menu, X, Phone, Maximize
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../data/projects';

const IconMap: Record<string, React.ElementType> = {
  tree: TreePine,
  shield: Shield,
  smart: Smartphone,
  leaf: Leaf,
  building: Building2,
  laptop: Laptop,
  sun: Sun,
  trash: Trash2,
  crown: Crown,
  key: Key,
  diamond: Diamond,
  concierge: BellRing,
  paw: PawPrint,
  cafe: Coffee
};

interface ProjectPageProps {
  projectId: string;
  onNavigate: (path: string) => void;
}

export default function ProjectPage({ projectId, onNavigate }: ProjectPageProps) {
  const project = PROJECTS.find(p => p.id === projectId);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [facSlide, setFacSlide] = useState(0);
  const [activeLayout, setActiveLayout] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResidencesOpen, setIsResidencesOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (project) {
      document.title = project.seoTitle;
    }
  }, [projectId, project]);

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

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nature-50">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-nature-900 mb-4">Project not found</h1>
          <button onClick={() => onNavigate('/')} className="text-nature-800 hover:underline">Return Home</button>
        </div>
      </div>
    );
  }

  const nextFac = () => setFacSlide((p) => (p + 1) % project.facilities.length);
  const prevFac = () => setFacSlide((p) => (p - 1 + project.facilities.length) % project.facilities.length);

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
            <div className="hidden lg:flex items-center justify-end space-x-2 xl:space-x-6">
              <button 
                onClick={() => onNavigate('/')} 
                className="text-[10px] font-bold text-nature-900/60 hover:text-nature-900 transition-all duration-300 uppercase tracking-[0.1em] xl:tracking-[0.2em] hover:tracking-[0.25em]"
              >
                Home
              </button>

              <button 
                onClick={() => scrollToSection('vr-tour')}
                className="text-[10px] font-bold text-nature-900/60 hover:text-nature-900 transition-all duration-300 uppercase tracking-[0.1em] xl:tracking-[0.2em] hover:tracking-[0.25em]"
              >
                VR Room Tour
              </button>

              <button 
                onClick={() => scrollToSection('features')}
                className="text-[10px] font-bold text-nature-900/60 hover:text-nature-900 transition-all duration-300 uppercase tracking-[0.1em] xl:tracking-[0.2em] hover:tracking-[0.25em]"
              >
                Project Features
              </button>

              <button 
                onClick={() => scrollToSection('layouts')}
                className="text-[10px] font-bold text-nature-900/60 hover:text-nature-900 transition-all duration-300 uppercase tracking-[0.1em] xl:tracking-[0.2em] hover:tracking-[0.25em]"
              >
                Layouts
              </button>

              <button 
                onClick={() => scrollToSection('lifestyle')}
                className="text-[10px] font-bold text-nature-900/60 hover:text-nature-900 transition-all duration-300 uppercase tracking-[0.1em] xl:tracking-[0.2em] hover:tracking-[0.25em]"
              >
                Facilities
              </button>

              <button 
                onClick={() => scrollToSection('pet-friendly')}
                className="text-[10px] font-bold text-nature-900/60 hover:text-nature-900 transition-all duration-300 uppercase tracking-[0.1em] xl:tracking-[0.2em] hover:tracking-[0.25em]"
              >
                Pet Friendly
              </button>

              <button 
                onClick={() => scrollToSection('amenities')}
                className="text-[10px] font-bold text-nature-900/60 hover:text-nature-900 transition-all duration-300 uppercase tracking-[0.1em] xl:tracking-[0.2em] hover:tracking-[0.25em]"
              >
                Location
              </button>
              
              <div className="relative group/coll py-6">
                <button className="flex items-center text-[10px] font-bold text-nature-900 transition-all duration-300 uppercase tracking-[0.1em] xl:tracking-[0.2em]">
                  The Collection <ChevronDown size={12} className="ml-1 xl:ml-2 opacity-30 transition-transform group-hover/coll:rotate-180" />
                </button>
                <div className="absolute right-0 top-full w-64 bg-white/95 backdrop-blur-xl border border-nature-100 shadow-2xl opacity-0 invisible group-hover/coll:opacity-100 group-hover/coll:visible transition-all duration-500 transform -translate-y-2 group-hover/coll:translate-y-0 rounded-2xl overflow-hidden mt-2 text-left">
                  <div className="py-2">
                    <button onClick={() => onNavigate('/project/the-aldenz')} className={`w-full text-left px-8 py-4 text-[9px] uppercase tracking-[0.2em] hover:bg-nature-50 hover:pl-10 transition-all duration-300 ${projectId === 'the-aldenz' ? 'text-nature-800 font-bold bg-nature-50/50' : 'text-nature-900/70 hover:text-nature-900'}`}>The Aldenz</button>
                  </div>
                </div>
              </div>

              <a 
                href={`https://wa.me/601111697251?text=${encodeURIComponent(`[CTA] Hi, can i get the price range for ${project.name}\n\nMy name is`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-nature-900 text-white px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-nature-800 transition-all duration-500 shadow-sm hover:shadow-lg shadow-nature-900/20 active:scale-95 text-center"
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
                <div className="flex flex-col h-full space-y-8">
                  <div className="flex flex-col space-y-6 text-left">
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
                              <button onClick={() => {setIsMenuOpen(false); onNavigate('/project/the-aldenz')}} className={`text-left py-2 group ${projectId === 'the-aldenz' ? 'pl-4 border-l-2 border-nature-800' : ''}`}>
                                <span className={`text-2xl sm:text-3xl font-serif ${projectId === 'the-aldenz' ? 'text-nature-800' : 'text-nature-900'} group-hover:text-nature-600 transition-colors`}>The Aldenz</span>
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    <div className="h-px bg-nature-200 w-full"></div>
                    
                    <div className="flex flex-col space-y-3 text-left">
                      <button onClick={() => {setIsMenuOpen(false); onNavigate('/')}} className="text-left text-xl font-serif text-nature-900 tracking-tight py-1">Home</button>
                      <button onClick={() => {setIsMenuOpen(false); scrollToSection('features')}} className="text-left text-xl font-serif text-nature-900 tracking-tight py-1">Project Features</button>
                      <button onClick={() => {setIsMenuOpen(false); scrollToSection('vr-tour')}} className="text-left text-xl font-serif text-nature-900 tracking-tight py-1">VR Room Tour</button>
                      <button onClick={() => {setIsMenuOpen(false); scrollToSection('layouts')}} className="text-left text-xl font-serif text-nature-900 tracking-tight py-1">Layouts</button>
                      <button onClick={() => {setIsMenuOpen(false); scrollToSection('lifestyle')}} className="text-left text-xl font-serif text-nature-900 tracking-tight py-1">Facilities</button>
                      <button onClick={() => {setIsMenuOpen(false); scrollToSection('pet-friendly')}} className="text-left text-xl font-serif text-nature-900 tracking-tight py-1">Pet Friendly</button>
                      <button onClick={() => {setIsMenuOpen(false); scrollToSection('amenities')}} className="text-left text-xl font-serif text-nature-900 tracking-tight py-1">Location</button>
                    </div>
                    
                    <div className="pt-4">
                      <a 
                        href={`https://wa.me/601111697251?text=${encodeURIComponent(`[CTA] Hi, can i get the price range for ${project.name}\n\nMy name is`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMenuOpen(false)} 
                        className="inline-block bg-nature-900 text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] w-full text-center shadow-lg active:scale-95 transition-transform"
                      >
                        Register Interest
                      </a>
                    </div>
                  </div>
                  
                  <div className="mt-auto flex justify-between items-center text-[9px] text-nature-400 uppercase tracking-[0.3em] pt-6 border-t border-nature-100 font-medium">
                    <span>Petaling Jaya, Selangor</span>
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
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-nature-950/90 via-nature-950/70 to-nature-950/90 backdrop-blur-[2px] z-10" />
        <img 
          src={project.heroImage} 
          alt={project.seoTitle}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.65]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 pt-20">
          <span className="text-white text-sm md:text-base uppercase tracking-[0.3em] mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,1)] font-bold">The Collection</span>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-medium mb-6 drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] max-w-6xl leading-tight tracking-tight">
            {project.seoTitle.split('|')[0].trim()}
          </h1>
          <p className="text-white text-lg md:text-xl max-w-2xl font-medium drop-shadow-[0_4px_20px_rgba(0,0,0,1)] leading-relaxed">
            {project.description}
          </p>
        </div>
      </section>

      {/* Project Features */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-nature-800 text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">Highlights</span>
            <h2 className="font-serif text-4xl md:text-5xl text-nature-900 tracking-tight">Project Features</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {project.features.map((feature, index) => {
              const IconComponent = IconMap[feature.icon] || Leaf;
              return (
                <div key={index} className="flex flex-col items-center text-center p-8 border border-nature-100 hover:border-nature-800 transition-colors duration-300 bg-nature-50/50">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-nature-100">
                    <IconComponent className="text-nature-800" size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-xl text-nature-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-500 font-light text-sm leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mini CTA 1 */}
      <section className="py-12 bg-nature-900 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            <div className="text-center md:text-left">
              <h3 className="font-serif text-2xl sm:text-3xl text-white mb-2 tracking-tight">Ready to see the detailed plans?</h3>
              <p className="text-nature-100/60 font-light text-sm uppercase tracking-[0.2em]">Full pricing & e-brochure available now</p>
            </div>
            <a 
              href={`https://wa.me/601111697251?text=${encodeURIComponent(`[CTA] Hi, can i get the price range for ${project.name}\n\nMy name is`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-nature-900 px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-nature-100 transition-colors shadow-2xl active:scale-95 duration-200 whitespace-nowrap"
            >
              Get immediate pricing
            </a>
          </div>
        </div>
      </section>

      {/* VR Tour Section */}
      <section id="vr-tour" className="py-24 bg-white border-b border-nature-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <span className="text-nature-800 text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">Immersive Experience</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-nature-900 tracking-tight leading-tight mb-6">
            Aldenz 360° VR Room Tour
          </h2>
          <p className="text-gray-500 font-light text-lg max-w-2xl mx-auto leading-relaxed">
            Experience the sophisticated layout and premium finishes of your future home from anywhere in the world. 
          </p>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden shadow-2xl border border-nature-100 bg-nature-50">
            <iframe 
              src="https://framemakers.com.my/clients/aldenz/" 
              title={`${project.name} 360 Virtual Reality Showroom Tour`}
              aria-label="360 VR Tour of Aldenz Showroom"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
            />
          </div>
          <div className="mt-8 flex items-center justify-center gap-3 text-nature-400">
            <Smartphone size={16} />
            <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Desktop & Mobile Optimized View</span>
          </div>
        </div>
      </section>

      {/* Unit Layouts */}
      <section id="layouts" className="py-12 lg:py-20 bg-nature-50 border-y border-nature-100 min-h-[85vh] flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-12">
            <span className="text-nature-800 text-xs font-semibold uppercase tracking-[0.3em] mb-2 block">Floor Plans</span>
            <h2 className="font-serif text-3xl md:text-4xl text-nature-900 tracking-tight">Unit Layouts</h2>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 lg:gap-4 mb-8 lg:mb-10">
            {project.unitLayouts.map((layout, index) => (
              <button
                key={index}
                onClick={() => setActiveLayout(index)}
                className={`px-6 lg:px-8 py-2 lg:py-3 text-xs font-medium uppercase tracking-widest transition-all duration-300 border ${
                  activeLayout === index 
                    ? 'bg-nature-800 text-white border-nature-800 shadow-md' 
                    : 'bg-white text-nature-900 border-nature-100 hover:border-nature-800'
                }`}
              >
                {layout.name}
              </button>
            ))}
          </div>

          {/* Layout Content */}
          <div className="bg-white border border-nature-100 shadow-sm overflow-hidden max-w-6xl mx-auto relative group/layout">
            {/* Navigation Arrows */}
            <button 
              onClick={() => setActiveLayout((prev) => (prev - 1 + project.unitLayouts.length) % project.unitLayouts.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-nature-900 border border-nature-100 shadow-lg opacity-0 group-hover/layout:opacity-100 transition-all duration-300 hover:bg-nature-900 hover:text-white"
              aria-label="Previous layout"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => setActiveLayout((prev) => (prev + 1) % project.unitLayouts.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-nature-900 border border-nature-100 shadow-lg opacity-0 group-hover/layout:opacity-100 transition-all duration-300 hover:bg-nature-900 hover:text-white"
              aria-label="Next layout"
            >
              <ChevronRight size={20} />
            </button>

            <div className="flex flex-col sm:flex-row h-auto sm:h-[600px]">
              {/* Left Info */}
              <div className="w-full sm:w-2/5 p-6 sm:p-10 border-b sm:border-b-0 sm:border-r border-nature-100 flex flex-col justify-between">
                <div>
                  <div className="mb-4 sm:mb-6">
                    <h3 className="font-serif text-2xl sm:text-3xl text-nature-900 mb-1">{project.unitLayouts[activeLayout].name}</h3>
                    <p className="text-nature-800 text-lg sm:text-xl font-medium mb-1">{project.unitLayouts[activeLayout].size}</p>
                    {(project.unitLayouts[activeLayout] as any).price && (
                      <p className="text-nature-700 text-sm font-black mb-3 sm:mb-4 tracking-tight">{(project.unitLayouts[activeLayout] as any).price}</p>
                    )}
                    
                    <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                      <div className="flex items-center text-gray-600">
                        <div className="w-7 h-7 rounded-full bg-nature-50 flex items-center justify-center mr-3">
                          <Building2 size={14} className="text-nature-800" />
                        </div>
                        <span className="text-sm font-light">{project.unitLayouts[activeLayout].bedrooms}</span>
                      </div>
                      {project.unitLayouts[activeLayout].remarks && (
                        <div className="flex items-start text-gray-600">
                          <div className="w-7 h-7 rounded-full bg-nature-50 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <Leaf size={14} className="text-nature-800" />
                          </div>
                          <span className="text-sm font-light italic leading-relaxed">
                            {project.unitLayouts[activeLayout].remarks}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => onNavigate(`/#register?project=${project.id}&type=${project.unitLayouts[activeLayout].name}`)}
                  className="w-full bg-nature-900 text-white py-3.5 text-xs font-medium uppercase tracking-[0.2em] hover:bg-nature-800 transition-colors duration-300 shadow-lg shadow-nature-900/10 mt-auto"
                >
                  Get Pricing & E-Brochure
                </button>
              </div>

              {/* Right Image */}
              <div 
                className="w-full sm:w-3/5 bg-gray-50 p-6 sm:p-10 flex items-center justify-center min-h-[300px] sm:min-h-0 cursor-zoom-in group/layout-img"
                onClick={() => setLightboxImage(project.unitLayouts[activeLayout].image)}
              >
                <div className="relative w-full h-[350px] sm:h-[500px] flex items-center justify-center">
                  <div className="absolute top-0 right-0 z-10 opacity-0 group-hover/layout-img:opacity-100 transition-opacity bg-white/80 p-2 rounded-full backdrop-blur-sm shadow-sm border border-nature-100">
                    <Maximize size={16} className="text-nature-900" />
                  </div>
                  <img 
                    src={project.unitLayouts[activeLayout].image} 
                    alt={`${project.name} ${project.unitLayouts[activeLayout].name} Floor Plan - Pet Friendly Condo in PJ 2026`} 
                    className="max-w-full max-h-full object-contain mix-blend-multiply transition-all duration-500 group-hover/layout-img:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 text-[10px] text-nature-400 opacity-0 group-hover/layout-img:opacity-100 transition-opacity uppercase tracking-widest font-bold">
                    Click to expand view
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pet Friendly Section */}
      <section id="pet-friendly" className="py-20 lg:py-24 bg-gradient-to-br from-[#0a2218] via-[#0d2a1e] to-[#0a2218] overflow-hidden relative">
        {/* Immersive background decoration */}
        <div className="absolute top-0 right-0 w-full h-full">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-nature-800/20 skew-x-12 translate-x-20" />
          <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-nature-700/10 rounded-full blur-[120px] opacity-40" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-nature-800/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="relative group p-2 lg:p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] lg:rounded-[2.5rem]">
                <img 
                  src="https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=1200&q=90" 
                  alt="Pet Friendly Lifestyle" 
                  className="w-full h-[300px] lg:h-auto rounded-[1.5rem] lg:rounded-[1.8rem] shadow-2xl relative z-10 transition-all duration-1000 object-cover lg:object-contain"
                  referrerPolicy="no-referrer"
                />
                {/* Floating Micro-Badge */}
                <div className="absolute -top-3 -right-3 lg:-top-4 lg:-right-4 bg-white text-nature-900 px-4 lg:px-6 py-2 lg:py-3 rounded-full shadow-2xl z-20">
                  <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-[0.2em] lg:tracking-[0.3em]">Exclusive 2026</span>
                </div>
              </div>
            </motion.div>

            <div className="w-full lg:w-1/2 text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center space-x-4 mb-6">
                  <span className="text-nature-100 text-[10px] font-black uppercase tracking-[0.5em]">Sanctuary</span>
                  <div className="w-12 h-px bg-nature-800" />
                </div>
                
                <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-6 lg:mb-8 tracking-tight leading-tight">
                  PJ's Premier <br className="hidden sm:block" />
                  <span className="italic font-light text-nature-100">Pet-Friendly</span> Haven
                </h2>
                
                <p className="text-nature-100/60 font-light text-base lg:text-xl mb-8 lg:mb-12 leading-relaxed max-w-xl">
                  A residence designed for harmony. The Aldenz provides specialized access and curated social hubs for you and your companions.
                </p>
                
                <div className="grid grid-cols-2 gap-4 lg:gap-8 mb-10 lg:mb-12">
                  <motion.div className="flex flex-col items-center text-center sm:text-left sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-5 p-5 bg-white/5 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-nature-800/40 flex items-center justify-center border border-nature-700">
                      <PawPrint className="text-nature-100" size={20} />
                    </div>
                    <div>
                      <h4 className="text-white text-[10px] lg:text-xs font-bold uppercase tracking-widest mb-1">Dedicated Parks</h4>
                      <p className="text-nature-100/40 text-[8px] uppercase font-bold tracking-wider">Secure Access</p>
                    </div>
                  </motion.div>
                  
                  <motion.div className="flex flex-col items-center text-center sm:text-left sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-5 p-5 bg-white/5 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-nature-800/40 flex items-center justify-center border border-nature-700">
                      <Coffee className="text-nature-100" size={20} />
                    </div>
                    <div>
                      <h4 className="text-white text-[10px] lg:text-xs font-bold uppercase tracking-widest mb-1">Corner Cafe</h4>
                      <p className="text-nature-100/40 text-[8px] uppercase font-bold tracking-wider">Social Hub</p>
                    </div>
                  </motion.div>
                </div>

                <div className="pt-8 border-t border-white/10">
                  <div className="flex items-center gap-3 text-nature-100/40">
                    <Leaf size={14} className="flex-shrink-0" />
                    <p className="text-[10px] uppercase tracking-[0.3em] font-medium italic">
                      Seamless connection to 65-acre central park
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mini CTA 2 */}
      <section className="py-16 bg-white border-y border-nature-100 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-block p-1 px-3 bg-nature-50 border border-nature-100 rounded-full mb-6">
            <span className="text-[10px] font-black text-nature-800 uppercase tracking-[0.3em]">Exclusive Preview 2026</span>
          </div>
          <h3 className="font-serif text-3xl md:text-4xl text-nature-900 mb-8 tracking-tight">The last RM5xx K Condo in Petaling Jaya.</h3>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a 
              href={`https://wa.me/601111697251?text=${encodeURIComponent(`[CTA] Hi, can i get the Early Bird Prices for ${project.name}\n\nMy name is`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-nature-900 text-white px-12 py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-nature-800 transition-all shadow-xl shadow-nature-900/20 active:scale-95 text-center"
            >
              Secure Early Bird Prices
            </a>
            <button 
              onClick={() => scrollToSection('register-now')}
              className="w-full sm:w-auto text-nature-900/60 hover:text-nature-900 px-8 py-5 text-[10px] font-bold uppercase tracking-[0.3em] transition-colors"
            >
              Unit Availability
            </button>
          </div>
        </div>
      </section>

      {/* Facilities Slider */}
      <section id="lifestyle" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12 max-w-5xl mx-auto">
            <div className="text-left">
              <span className="text-nature-800 text-xs font-semibold uppercase tracking-[0.3em] mb-3 block">Lifestyle</span>
              <h2 className="font-serif text-3xl md:text-5xl text-nature-900 tracking-tight">Exclusive Facilities</h2>
            </div>
            <div className="flex space-x-3 mb-1">
              <button 
                onClick={prevFac}
                className="w-10 h-10 md:w-14 md:h-14 bg-white shadow-xl flex items-center justify-center text-nature-900 hover:bg-nature-50 transition-all active:scale-95 rounded-full border border-nature-100"
                aria-label="Previous facility"
              >
                <ChevronLeft size={24} strokeWidth={1.5} />
              </button>
              <button 
                onClick={nextFac}
                className="w-10 h-10 md:w-14 md:h-14 bg-white shadow-xl flex items-center justify-center text-nature-900 hover:bg-nature-50 transition-all active:scale-95 rounded-full border border-nature-100"
                aria-label="Next facility"
              >
                <ChevronRight size={24} strokeWidth={1.5} />
              </button>
            </div>
          </div>
          
          <div className="relative group max-w-5xl mx-auto">
            <div className="overflow-hidden relative h-[300px] sm:h-[500px] border border-nature-100">
              {project.facilities.map((fac, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === facSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                  <img 
                    src={fac.image} 
                    alt={(fac as any).alt || fac.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-nature-900/80 to-transparent z-20">
                    <h3 className="font-serif text-3xl text-white drop-shadow-lg">{fac.name}</h3>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Dots */}
            <div className="flex justify-center space-x-2 mt-6">
              {project.facilities.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setFacSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === facSlide ? 'bg-nature-800 w-6' : 'bg-nature-100 hover:bg-nature-700'}`}
                  aria-label={`Go to facility slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Connectivity / Amenities */}
      <section id="amenities" className="py-24 bg-nature-50 border-t border-nature-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="mb-12">
                <span className="text-nature-800 text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">Connectivity</span>
                <h2 className="font-serif text-4xl md:text-5xl text-nature-900 tracking-tight">Surrounding Amenities</h2>
              </div>
              
              <div className="space-y-4">
                {project.amenities.map((amenityGroup, index) => (
                  <div key={index} className="border border-nature-100 bg-white">
                    <button 
                      className="w-full flex justify-between items-center p-6 hover:bg-nature-50 transition-colors"
                      onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                    >
                      <span className="font-semibold text-nature-900 uppercase tracking-wider text-sm">{amenityGroup.category}</span>
                      {openAccordion === index ? (
                        <ChevronUp size={20} className="text-nature-800" />
                      ) : (
                        <ChevronDown size={20} className="text-nature-800" />
                      )}
                    </button>
                    <AnimatePresence>
                      {openAccordion === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 bg-white border-t border-nature-100">
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {amenityGroup.items.map((item, i) => (
                                <li key={i} className="flex items-start text-gray-500 font-light text-sm">
                                  <MapPin size={16} className="text-nature-800 mr-3 mt-0.5 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-32">
              <div 
                className="relative group cursor-zoom-in overflow-hidden border border-nature-100 shadow-2xl"
                onClick={() => setLightboxImage((project as any).locationMap || project.image)}
              >
                <div className="absolute inset-0 bg-nature-900/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  <Maximize size={20} className="text-nature-900" />
                </div>
                <img 
                  src={(project as any).locationMap || project.image} 
                  alt="The Center of It All Location Map" 
                  className="w-full aspect-[4/3] object-cover transform group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-nature-900/80 to-transparent z-20">
                  <p className="text-white text-xs uppercase tracking-widest font-bold">The Center of It All</p>
                  <p className="text-white/90 text-[10px] mt-1">Click to expand location map</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-nature-900/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-10"
            onClick={() => setLightboxImage(null)}
          >
            <motion.button 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute top-6 right-6 text-white hover:text-nature-100 transition-colors z-[110]"
              onClick={(e) => { e.stopPropagation(); setLightboxImage(null); }}
            >
              <X size={32} strokeWidth={1.5} />
            </motion.button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative max-w-7xl w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={lightboxImage} 
                alt="Enlarged view" 
                className="max-w-full max-h-full object-contain shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section id="register-now" className="py-12 lg:py-24 bg-nature-900 text-white text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl lg:text-5xl mb-3 lg:mb-6 tracking-tight">Interested in {project.name}?</h2>
          <p className="text-nature-100 font-light text-xs lg:text-lg mb-6 lg:mb-10 leading-relaxed">
            Register your interest today to receive the e-brochure, floor plans, and exclusive early bird privileges.
          </p>
          <a 
            href={`https://wa.me/601111697251?text=${encodeURIComponent(`[CTA] Hi, I am interested in ${project.name}. Can I View the Show Gallery?\n\nMy name is`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-white text-white px-8 lg:px-10 py-3 lg:py-4 text-[10px] lg:text-sm font-medium uppercase tracking-[0.2em] hover:bg-white hover:text-nature-900 transition-colors duration-300 mb-8"
          >
            Register Now
          </a>
          <div className="flex justify-center">
            <div className="flex items-center space-x-4">
              <div className="w-px h-10 bg-[#C5A059]/30"></div>
              <p className="text-[10px] lg:text-[11px] font-medium text-[#C5A059]/80 uppercase tracking-[0.4em] leading-relaxed max-w-[200px] text-left">
                Last chance to grab RM5xxk condo in PJ
              </p>
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
                <li>
                  <button 
                    onClick={() => onNavigate('/project/the-aldenz')} 
                    className={`text-sm font-light transition-colors ${project.id === 'the-aldenz' ? 'text-white font-medium' : 'text-nature-100 hover:text-white'}`}
                  >
                    The Aldenz
                  </button>
                </li>
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
