import React, { useEffect, useRef } from "react";
import "tailwindcss/tailwind.css";
import img1 from "../../assets/pexels-max-fischer-5872174.jpg"
import img2 from "../../assets/pexels-shkrabaanthony-5264897.jpg"

export default function Slider() {
  const carouselRef = useRef(null);

  useEffect(() => {
    let index = 0;
    const slides = document.querySelectorAll(".carousel-item");
    const totalSlides = slides.length;

    const interval = setInterval(() => {
      if (carouselRef.current) {
        index = (index + 1) % totalSlides;
        carouselRef.current.style.transform = `translateX(-${index * 100}%)`;
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto pb-6">
      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold uppercase pt-4">Welcome to our Store</h1>
        <p className="text-gray-600 dark:text-gray-400  uppercase">
         Up to 70% off!
        </p>
      </div>

      {/* Carousel Wrapper */}
      <div className="overflow-hidden rounded-lg shadow-lg relative w-full">
        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex transition-transform duration-700 ease-in-out w-full"
        >
          {/* Slide 1 */}
          <div className="carousel-item bg-white dark:bg-gray-800 p-6 flex-shrink-0 w-full">
            <img
              src={img1}
              alt="Slide 1"
              className="w-full h-64 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-4 uppercase"> Sale Up To 70%!</h2>
            <p className="text-gray-600 dark:text-gray-400 uppercase">            
             Hurry up! sale will end soon.
            </p>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item bg-white dark:bg-gray-800 p-6 flex-shrink-0 w-full">
            <img
              src={img2}
              alt="Slide 2"
              className="w-full h-64 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-4 uppercase">New Season</h2>
            <p className="text-gray-600 dark:text-gray-400 uppercase">
             time for change
            </p>
          </div>

       
        </div>
      </div>

     
    </div>
  );
}
