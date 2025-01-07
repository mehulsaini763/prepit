import Link from "next/link";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  IconButton,
} from "@/components/material-tailwind/components";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

import Slider from "react-slick";

import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { articles } from "./data";
import Image from "next/image";

const CustomCarousel = () => {
  const ref = useRef();
  const matchMedia = useMediaQuery({ query: "(max-width:920px)" });
  const settings = {
    ref: ref,
    slidesToShow: matchMedia ? 1 : 2,
    arrows: false,
    centerPadding: "16px",
  };
  return (
    <div className="flex flex-col">
      <Slider {...settings}>
        {articles.map((article, i) => (
          <Card className="w-96" key={i}>
            <CardBody>
              <div className="flex flex-col justify-center items-center bg-neutral-300 w-full h-48 md:h-36">
                <Image
                  src={article.image}
                  width={500}
                  height={500}
                  className="object-contain w-full h-full aspect-square"
                />
              </div>
              <p
                className={`line-clamp-2 font-medium ${
                  matchMedia ? "text-lg" : ""
                }`}
              >
                {article.title}
              </p>
              <p
                className={`line-clamp-5 text-justify text-pretty ${
                  matchMedia ? "text-sm" : "text-xs"
                }`}
              >
                {article.description}
              </p>
            </CardBody>
            <CardFooter className="pt-0">
              <Link href={article.href}>
                <Button size={matchMedia ? "lg" : "md"}>Read More</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </Slider>
      <div className="flex items-center justify-end px-4">
        <div className="flex items-center justify-between gap-4">
          <IconButton
            size={matchMedia ? "lg" : "md"}
            className="rounded-full"
            onClick={() => ref.current.slickPrev()}
          >
            <ArrowLeftIcon className="w-4 h-4" />
          </IconButton>
          <IconButton
            size={matchMedia ? "lg" : "md"}
            className="rounded-full"
            onClick={() => ref.current.slickNext()}
          >
            <ArrowRightIcon className="w-4 h-4" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default CustomCarousel;
