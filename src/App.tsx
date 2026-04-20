import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import WhatsAppButton from './components/WhatsAppButton';
import RegistrationModal from './components/RegistrationModal';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Show modal after 15 seconds if not shown this session
    const shown = sessionStorage.getItem('registration_modal_shown');
    if (!shown) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
        sessionStorage.setItem('registration_modal_shown', 'true');
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    const targetHash = path.startsWith('#') ? path : `#${path}`;
    window.location.hash = targetHash;
    // Hash change handler will update state
  };

  // Determine the actual page component to render based on the primary hash path
  // ignoring any subsequent anchors within that page
  const getPageBase = (hash: string) => {
    const parts = hash.split('#').filter(Boolean);
    const firstPart = parts[0] || '/';
    
    // If the first part is an anchor (doesn't start with /), it's the home page
    if (!firstPart.startsWith('/')) return '/';
    
    if (firstPart.startsWith('/project/')) return '/project';
    if (firstPart === '/privacy-policy') return '/privacy-policy';
    if (firstPart === '/terms-of-service') return '/terms-of-service';
    return '/';
  };

  const pageBase = getPageBase(currentPath);
  
  // determine the page key for animation
  const getAnimationKey = (hash: string) => {
    const parts = hash.split('#').filter(Boolean);
    const firstPart = parts[0] || '/';
    
    // Root anchors share the same base page
    if (!firstPart.startsWith('/')) return '/';
    
    return firstPart;
  };

  const animationKey = getAnimationKey(currentPath);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const pageTransition = {
    duration: 0.5,
    ease: [0.16, 1, 0.3, 1]
  };

  // Handle scroll logic
  useEffect(() => {
    const hashParts = currentPath.split('#').filter(Boolean);
    const firstPart = hashParts[0] || '/';
    
    // Case 1: Simple root or page navigation (e.g. #/ or #/project/id)
    if (hashParts.length === 1 && firstPart.startsWith('/')) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    } 
    // Case 2: Anchors (e.g. #lifestyle, #/project/id#lifestyle)
    else {
      const anchorId = hashParts[hashParts.length - 1];
      if (anchorId && !anchorId.startsWith('/')) {
        const scrollWithRetry = (retryCount = 0) => {
          const element = document.getElementById(anchorId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          } else if (retryCount < 5) {
            setTimeout(() => scrollWithRetry(retryCount + 1), 100);
          }
        };
        scrollWithRetry();
      }
    }
  }, [currentPath]); // Run on every hash change

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={animationKey}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
        className="w-full"
      >
        {pageBase === '/privacy-policy' ? (
          <PrivacyPolicy onNavigate={navigate} />
        ) : pageBase === '/terms-of-service' ? (
          <TermsOfService onNavigate={navigate} />
        ) : pageBase === '/project' ? (
          <ProjectPage 
            projectId={animationKey.replace('/project/', '')} 
            onNavigate={navigate} 
          />
        ) : (
          <HomePage onNavigate={navigate} />
        )}
      </motion.div>
      <WhatsAppButton />
      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </AnimatePresence>
  );
}

export default App;
