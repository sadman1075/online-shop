"use client";

import Image from "next/image";
import banner from "../../app/assets/images/banner.png";
import sbanner1 from "../../app/assets/images/sbanner1.png";
import sbanner2 from "../../app/assets/images/sbanner2.png";
import AosWrapper from "../AosWrapper";



export default function Banner() {


  return (
    <AosWrapper>
      <section className="max-w-7xl mx-auto p-4">

        {/* Heading */}
        <div data-aos="fade-right">
          <h1 className="text-5xl  md:text-[197px] font-extrabold text-center mb-6 ">
            <span className="text-black dark:text-white">DO IT </span>
            <span className="text-blue-500">RIGHT</span>
          </h1>
        </div>

        {/* Hero Section */}
        <section data-aos="zoom-in-up" className="relative rounded-3xl overflow-hidden  h-[400px] md:h-[700px]">

          <Image
            src={banner}
            alt="Banner"
            fill
            className="h-full w-full object-cover object-center"
            priority
          />

          {/* Overlay Content */}
          <div className="relative z-10 flex h-full items-center justify-between p-8 text-white bg-black/30">

            {/* Left Content */}
            <div className="md:max-w-md absolute left-6 top-3/4 -translate-y-1/2 flex flex-col gap-4">
              <h2 className="text-xl md:text-4xl font-bold md:mb-2">NIKE AIR MAX</h2>
              <p className="text-xs md:text-sm md:mb-4">
                Nike introducing the new air max for <br /> everyone&apos;s comfort
              </p>
              <button className="bg-blue-600  md:px-5 py-2 rounded-md text-sm font-semibold hover:bg-blue-700">
                SHOP NOW
              </button>




            </div>

            {/* Right Images */}
            <div className="absolute right-6 top-3/4 -translate-y-1/2 flex flex-col gap-4">

              <div className="flex flex-col gap-4">
                <Image
                  src={sbanner1}
                  alt="Thumb 1"
                  width={70}
                  height={70}
                  className="rounded-lg border"
                />
                <Image
                  src={sbanner2}
                  alt="Thumb 2"
                  width={70}
                  height={70}
                  className="rounded-lg border"
                />
              </div>
            </div>

          </div>
        </section>
      </section>
    </AosWrapper>
  );
}