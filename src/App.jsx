import { useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Strip from './components/Strip';
import About from './components/About';
import Products from './components/Products';
import Services from './components/Services';
import Markets from './components/Markets';
import HowItWorks from './components/HowItWorks';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DemoDialog from './components/DemoDialog';

export default function App() {
  const heroRef = useRef(null);
  const [demoOpen, setDemoOpen] = useState(false);

  const startTour = () => heroRef.current?.start();
  const openDemo = () => {
    heroRef.current?.end();
    setDemoOpen(true);
  };

  return (
    <>
      <Navbar onStartTour={startTour} onOpenDemo={openDemo} />
      <main>
        <Hero ref={heroRef} onStartTour={startTour} onOpenDemo={openDemo} />
        <Strip />
        <About />
        <Products />
        <Services />
        <Markets />
        <HowItWorks />
        <Contact onOpenDemo={openDemo} />
      </main>
      <Footer />
      <DemoDialog open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
