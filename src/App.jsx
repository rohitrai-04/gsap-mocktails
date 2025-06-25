import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

import Hero from "./components/Hero";
import Cocktails from "./components/Cocktails";
import Navbar from "./components/Navbar";


gsap.registerPlugin(ScrollTrigger, SplitText);
const App = () => {
  return (
    <>
      <main>
    <Navbar/>
        <Hero />
        <Cocktails />
      </main>
    </>
  );
};
export default App;
