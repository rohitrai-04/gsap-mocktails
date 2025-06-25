import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const videoRef = useRef();
  const scrollTriggerRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const startValue = isMobile ? "top 50%" : "center 60%";
  const endValue = isMobile ? "120% top" : "bottom top";

  // Function to initialize video ScrollTrigger - defined outside hooks for accessibility
  // Note: Remove the 'markers: true' option before deploying to production
  const initVideoScroll = (video) => {
    // Create ScrollTrigger for video playback
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: "#hero",
      start: startValue,
      end: endValue,
      scrub: true,
      markers: true, // Add markers for debugging (remove in production)
      onUpdate: (self) => {
        if (video.readyState >= 2) { // Check if video is loaded enough to play
          // Calculate video time based on scroll progress
          const videoTime = self.progress * video.duration;
          video.currentTime = videoTime;
        }
      },
      onEnter: () => video.readyState >= 2 && video.play(),
      onLeave: () => video.readyState >= 2 && video.pause(),
      onEnterBack: () => video.readyState >= 2 && video.play(),
      onLeaveBack: () => video.readyState >= 2 && video.pause(),
    });
  };

  // GSAP animations for text and leaves
  useGSAP(() => {
    const heroSplit = new SplitText(".title", { type: "chars, words" });
    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1,
      ease: "expo.out",
      stagger: 0.05,
    });
    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1,
    });

 gsap.timeline({
        scrollTrigger: {
          trigger: "video",
          start: startValue,
          end: endValue,
          scrub: true,
          pin:true,
        },
      })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0);
   // videoRef.current.onloadedmetadata=()=>{
   //   tl.to(videoRef.current,{
   //     currentTime:videoRef.current.duration
   //   })
  }, []);

  // Setup and cleanup for video animation
  useEffect(() => {
    const video = videoRef.current;

    // Handler function for the loadeddata event
    const handleVideoLoaded = () => initVideoScroll(video);

    // Check if video is ready or wait for it to be ready
    if (video.readyState >= 2) {
      initVideoScroll(video);
    } else {
      video.addEventListener('loadeddata', handleVideoLoaded);
    }

    // Cleanup function
    return () => {
      if (video) {
        video.removeEventListener('loadeddata', handleVideoLoaded);
      }
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, []);




  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>
        <img
          src="/images/hero-left-leaf.png"
          alt="left-leaf"
          className="left-leaf"
        />
        <img
          src="/images/hero-right-leaf.png"
          alt="right-leaf"
          className="right-leaf"
        />
        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>
            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses.
              </p>
              <a href="#cocktails">View Cocktails</a>
            </div>
          </div>
        </div>
      </section>
      <div className="video absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="/videos/output.mp4"
          muted
          playsInline
          preload="auto"

        />
      </div>
    </>
  );
};

export default Hero;
