// LandingPage.jsx
import React from "react";

import HeroSection from "../component/HeroSection";
import FeaturesSection from "../component/FeaturesSection";
import TestimonialSection from "../component/TestimonialSection";

const LandingPage = () => {
  return (
    <div className="landing-page mt-20">

      <HeroSection />
      <FeaturesSection />
      <TestimonialSection />
    </div>
  );
};

export default LandingPage;
