import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    title: "Fast Grievance Resolution",
    subtitle: "Submit, track, and resolve complaints with transparent workflows.",
  },
  {
    title: "Village to District Accountability",
    subtitle: "Role-based governance from Citizen to District Officer.",
  },
  {
    title: "Modern Rural Service Platform",
    subtitle: "Community engagement, notifications, and smart chatbot assistance.",
  },
];

export default function HeroCarousel() {
  return (
    <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 3000 }} pagination={{ clickable: true }} loop>
      {slides.map((slide) => (
        <SwiperSlide key={slide.title}>
          <div className="rounded-3xl bg-gradient-to-br from-[#0B3C5D] via-sky-700 to-sky-500 p-10 text-white shadow-xl sm:p-14">
            <h1 className="text-3xl font-bold leading-tight sm:text-5xl">{slide.title}</h1>
            <p className="mt-4 max-w-2xl text-sm text-sky-50 sm:text-lg">{slide.subtitle}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
