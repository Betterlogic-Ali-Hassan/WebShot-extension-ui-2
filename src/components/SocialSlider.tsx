"use client";
import { Swiper, SwiperSlide } from "swiper/react";
//@ts-ignore
import "swiper/css";
//@ts-ignore
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { useRef, useEffect, useState } from "react";
import SwiperCore from "swiper";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { data } from "@/constant/SocialIconData";
const SocialSlider = () => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<SwiperCore | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (swiperRef.current) {
      const swiper = swiperRef.current;
      swiper.on("slideChange", () => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
      });
    }
  }, []);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.params.navigation) {
      const { navigation } = swiperRef.current.params;
      if (typeof navigation !== "boolean") {
        navigation.prevEl = prevRef.current;
        navigation.nextEl = nextRef.current;
        swiperRef.current.navigation.init();
        swiperRef.current.navigation.update();
      }
    }
  }, []);

  return (
    <div className='relative'>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        slidesPerView={6}
        spaceBetween={16}
        navigation={true}
        modules={[Navigation]}
        className='mySwiper'
        style={{
          maxWidth: "458px",
        }}
      >
        {data.map((item, i) => (
          <SwiperSlide key={i}>
            <a href='#'>{item.icon}</a>
          </SwiperSlide>
        ))}
      </Swiper>
      {!isBeginning && (
        <button
          ref={prevRef}
          className='absolute top-[50%] translate-y-[-50%] -left-4 z-50 border hover:bg-hover bg-card flex items-center justify-center w-10 h-10 rounded-full '
          onClick={() => swiperRef.current?.slideTo(0)}
        >
          <ChevronLeft size={24} className='mr-0.5' />
        </button>
      )}
      {!isEnd && (
        <button
          ref={nextRef}
          className='absolute top-[50%] translate-y-[-50%] -right-4 z-50 border hover:bg-hover bg-card flex items-center justify-center w-10 h-10 rounded-full'
          onClick={() =>
            swiperRef.current?.slideTo(swiperRef.current?.slides.length - 1)
          }
        >
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  );
};

export default SocialSlider;
