"use client";

import Image from "next/image";

import {
  Avatar,
  IconButton,
  Typography,
} from "@/components/material-tailwind/components";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { testimonials } from "./data";

const Testimonial = () => {
  const ref = useRef();
  const matchMedia = useMediaQuery({ query: "(max-width:920px)" });

  return (
    <section
      id="testimonials"
      className="bg-blue-gray-50 flex justify-center items-center py-16 md:px-4 md:min-h-screen"
    >
      {/* container */}
      <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl gap-8 md:gap-8 my-8 w-full">
        {/* content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-4">
          <Typography variant="h2" className="px-4">
            Testimonial What our Students Say
          </Typography>
          <div className="relative">
            <Slider ref={ref} slidesToShow={1} arrows={false}>
              {testimonials.map((data, i) => (
                <div className="w-96" key={i}>
                  <div className="space-y-4">
                    <p className="text-xl md:text-base font-semibold">
                      {data.title}
                    </p>
                    <p className="md:text-sm">{data.testimonial}</p>
                    <div className="flex items-center py-2 gap-4">
                      <Avatar
                        src={data.src}
                        alt="avatar"
                        size={matchMedia ? "lg" : ""}
                      />
                      <div>
                        <p className="text-lg md:text-base font-semibold">
                          {data.name}
                        </p>
                        <p className="text-lg md:text-base font-normal">
                          {data.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
            <div className="absolute m-2 md:m-4  bottom-4 right-4 flex items-center justify-between gap-4">
              <IconButton
                size={matchMedia ? "lg" : "sm"}
                className="rounded-full"
                onClick={() => ref.current.slickPrev()}
              >
                <ArrowLeftIcon className="w-4 h-4" />
              </IconButton>
              <IconButton
                size={matchMedia ? "lg" : "sm"}
                className="rounded-full"
                onClick={() => ref.current.slickNext()}
              >
                <ArrowRightIcon className="w-4 h-4" />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="hidden md:flex md:w-1/2 justify-center">
          <Image
            src="/assets/customer-review.svg"
            width={450}
            height={450}
            alt="Image"
            className="w-80 h-80 text-neutral-300"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
