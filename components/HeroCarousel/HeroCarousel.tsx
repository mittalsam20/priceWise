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
    <div>
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
    </div>
  );
};

export default HeroCarousel;
