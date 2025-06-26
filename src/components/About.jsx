import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
const About = () => {
  useGSAP(() => {
const titleSplit = SplitText.create('#about h2',{type:'word'})
const scrolltimeline = gsap.timeline({
    scrollTrigger:{
        trigger:'#about',
        start:'top center',
     
    }
})
scrolltimeline.from(titleSplit.words,{
    opacity:0,
    duration:1,
    yPercent:100,
    ease:'expo.out',
    stagger:0.02,
}) 
.from('.grid-grid, .bottom-grid',{
    opacity:0,
    duration:1,
    ease:'power1.inOut',
    stagger:0.04,
},'-=0.5')
  });

  return (
    <>
      <section id="about">
        <div className="mb-16 md:px-0 px-5 ">
          <div className="content">
            <div className="md:col-span-8">
              <p className="badge">Best Cocktails</p>
              <h2>
                Where every details matters{" "}
                <span className="text-white">-</span> from muddle to garnish
              </h2>
            </div>
            <div className="sub-content">
              <p>
                Every cocktail we serve is a reflection of our obsession with
                detail — from the first muddle to the final garnish. That careis
                what turns a simple drink into something truly memorable.
              </p>
              <div>
                <p className="md:text-3xl text-xl font-bold">
                  <span>4.5/5</span>
                </p>
                <p className="text-sm text-white">More than +12000 customers</p>
              </div>
            </div>
          </div>
        </div>
        <div className="top-grid">
          <div className="md:col-span-3 ">
            <div className="noisy" />
            <img src="/images/abt1.png" alt="gridImg1" />
          </div>
          <div className="md:col-span-6 ">
            <div className="noisy" />
            <img src="/images/abt2.png" alt="gridImg2" />
          </div>
          <div className="md:col-span-3 ">
            <div className="noisy" />
            <img src="/images/abt5.png" alt="gridImg5" />
          </div>
        </div>

        <div className="bottom-grid">
          <div className="md:col-span-8">
            <div className="noisy" />
            <img src="/images/abt3.png" alt="gridImg3" />
          </div>
          <div className="md:col-span-4">
            <div className="noisy" />
            <img src="/images/abt4.png" alt="gridImg4" />
          </div>
        </div>


      
      </section>
    </>
  );
};
export default About;
