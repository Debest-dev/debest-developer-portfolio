import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Layout components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Portfolio } from './pages/Portfolio';
import { ProjectDetail } from './pages/ProjectDetail';
import { Services } from './pages/Services';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Contact } from './pages/Contact';

// Animated Route Wrapper
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="flex-grow flex flex-col"
    >
      {children}
    </motion.div>
  );
};

// Animated Routes Switcher
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />
        <Route
          path="/about"
          element={
            <PageWrapper>
              <About />
            </PageWrapper>
          }
        />
        <Route
          path="/portfolio"
          element={
            <PageWrapper>
              <Portfolio />
            </PageWrapper>
          }
        />
        <Route
          path="/portfolio/:slug"
          element={
            <PageWrapper>
              <ProjectDetail />
            </PageWrapper>
          }
        />
        <Route
          path="/services"
          element={
            <PageWrapper>
              <Services />
            </PageWrapper>
          }
        />
        <Route
          path="/blog"
          element={
            <PageWrapper>
              <Blog />
            </PageWrapper>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <PageWrapper>
              <BlogPost />
            </PageWrapper>
          }
        />
        <Route
          path="/contact"
          element={
            <PageWrapper>
              <Contact />
            </PageWrapper>
          }
        />
        {/* Fallback route */}
        <Route
          path="*"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-text">
        {/* Sticky navbar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-grow flex flex-col">
          <AnimatedRoutes />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
