import { BrowserRouter } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  OnchainScore,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
  Footer,
} from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        {/* Hero section without stars */}
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>

        {/* All other sections with stars background */}
        <div className="relative z-0">
          <About />
          <Experience />
          <Tech />
          <Works />
          <OnchainScore />
          <Contact />
          <StarsCanvas />
        </div>

        {/* Footer with social links */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
