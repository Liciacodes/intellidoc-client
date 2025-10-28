import React from 'react';

import Header from '../../components/layout/Header';
import HeroSection from '../../components/landing/Hero';
import FeaturesSection from '../../components/landing/FeaturesSection';
import HowItWorksSection from '../../components/landing/HowItsWorks';
import TestimonialsSection from '../../components/landing/TestimonialsSection';
import PricingSection from '../../components/landing/PricingSection';
import Footer from '../../components/layout/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="dark bg-background-light dark:bg-background-dark font-display" >
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          {/* Header */}
       <Header/>
          
          {/* Main Content */}
          <main className="flex-1">
         <HeroSection/>
           <FeaturesSection/>
           <HowItWorksSection/>
           <TestimonialsSection/>
            <PricingSection/>
          </main>

       <Footer/>
      
        </div>
      </div>
    </div>
  );
};

export default LandingPage
