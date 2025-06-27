"use clients";
import React, { useRef, useState } from "react";
import { allCocktails } from "../../constant";
import { useGSAP } from "@gsap/react";
import gsap from "gsap"
const Menu = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCocktails = allCocktails.length;
useGSAP(()=>{
 gsap.fromTo("#title",{opacity:0},{opacity:1,duration:1})
gsap.fromTo(".cocktail img",{opacity:0,xPercent:-100},{xPercent:0,opacity:1,duration:1,ease:"power1.inOut"})
},[currentIndex])
gsap.fromTo(".details h2",{opacity:0,yPercent:100},{yPercent:0,opacity:100,ease:"power1.inOut"})
gsap.fromTo(".details p",{opacity:0,yPercent:100},{yPercent:0,opacity:100,ease:"power1.inOut"})


  const goToSlide = (index) => {
    const newIndex = (index + totalCocktails) % totalCocktails;
    setCurrentIndex(newIndex);
  };
  const getCocktailAt = (indexoffset)=>{
    return allCocktails[(currentIndex+indexoffset+totalCocktails) % totalCocktails]
  }
  const currentCocktail = getCocktailAt(0)
  const prevCocktail = getCocktailAt(-1)
  const nextCocktail = getCocktailAt(1)

  const contentRef = useRef()
  return (
    <section id="menu" aria-labelledby="menu-heading" >
      <img
        src="/images/slider-left-leaf.png"
        alt="left-leaf"
        id="m-left-leaf"
          className="absolute bottom-0 right-0 max-h-screen overflow-hidden"
      />
      <img
        src="/images/slider-right-leaf.png"
        alt="right-leaf"
        id="m-right-leaf"
       className="overflow-hidden"
      />
      <h2 id="menu-heading" className="sr-only">
        Cocktails Menu
      </h2>
      <nav className="cocktail-tabs" aria-label="coctail Navigation">
        {allCocktails.map((cocktail, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              className={`${
                isActive
                  ? "text-white border-white"
                  : "text-white/50 border-white/50"
              }`}
              onClick={() => goToSlide(index)}
              key={cocktail.id}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>
      <div className="content">
        <div className="arrows">
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex - 1)}
          >
            <span>{prevCocktail.name}</span>
            <img src="/images/right-arrow.png" alt="left-arrow" aria-hidden="true" />
          </button>
          <button
            className="text-right"
            onClick={() => goToSlide(currentIndex + 1)}
          >
            <span>{nextCocktail.name}</span>
            <img src="/images/left-arrow.png" alt="right-arrow" aria-hidden="true" />
          </button>
        </div>
        <div className="cocktail">
            <img src={currentCocktail.image} className="object-contain max-h-[80vh]" alt="" />
        </div>
        <div className="recipe">
            <div ref={contentRef} className="info ">
                <p>Recipe for :</p>
                <p id="title">{currentCocktail.name}</p>

            </div>
            <div className="details">
                <h2>{currentCocktail.title}</h2>
                <p>{currentCocktail.description}</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
