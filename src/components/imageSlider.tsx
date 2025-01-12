import React, { useState } from "react";

interface ImageSliderProps {
  images: string[];
  name: string;
}

export const imgBaseURL = "https://test.catalystegy.com/public/";
const ImageSlider: React.FC<ImageSliderProps> = ({ images, name }) => {
  // State to track the current image index and direction
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  // Handlers for navigation
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection("left");
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection("right");
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-40 overflow-hidden">
      {/* Slider Container */}
      <div
        className={`w-full h-full flex transition-transform duration-500 ${
          direction === "right" ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={imgBaseURL + img}
            alt={`${name} ${index + 1}`}
            className="w-full h-40 object-cover rounded-md flex-shrink-0"
          />
        ))}
      </div>

      {/* Left Button */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white text-black px-2 py-1 rounded-full z-10"
      >
        {"<"}
      </button>

      {/* Right Button */}
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white text-black px-2 py-1 rounded-full z-10"
      >
        {">"}
      </button>

      {/* Dots Container */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 z-10">
        {images.map((_, index) => (
          <div
            key={index}
            // onClick={(e: React.MouseEvent) => {
            //   e.stopPropagation();
            //   handleDotClick(index);
            // }}
            className={`w-3 h-3 bg-white border border-gray-200 rounded-full cursor-pointer ${
              currentIndex === index ? "" : " opacity-50 w-2 h-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
