"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Image from "next/image";
import { Carousel } from "react-responsive-carousel";

const heroImages = [
  { src: "assets/images/hero-1.svg", alt: "smartWatch" },
  { src: "assets/images/hero-2.svg", alt: "bag" },
  { src: "assets/images/hero-3.svg", alt: "lamp" },
  { src: "assets/images/hero-4.svg", alt: "air fryer" },
  { src: "assets/images/hero-5.svg", alt: "chair" },
];

const HeroCarousel = () => {
  return (
    <div className="hero-carousel">
      <Carousel
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showThumbs={false}
        showStatus={false}
      >
        {heroImages.map((imageProps, index) => (
          <Image
            key={index}
            width={484}
            height={484}
            className={"object-contain"}
            {...imageProps}
          />
        ))}
      </Carousel>
      <Image
        height={175}
        width={175}
        alt={"arrow"}
        src={"assets/icons/hand-drawn-arrow.svg"}
        className={"max-xl:hidden absolute -left-[15%] bottom-0 z-0"}
      />
    </div>
  );
};

export default HeroCarousel;
