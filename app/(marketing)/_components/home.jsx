"use client";

import Image from "next/image";

import {
  Button,
  Card,
  CardBody,
  Typography,
} from "@/components/material-tailwind/components";

import Header from "@/app/(marketing)/_components/header";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const matchMedia = useMediaQuery({ query: "(max-width:920px)" });
  useEffect(() => {
    router.prefetch("/signup");
    router.prefetch("/signup");
    router.prefetch("/dashboard");
  }, []);
  return (
    <section
      id="home"
      className="flex flex-col items-center gap-12 md:gap-24 p-4 w-full min-h-screen"
    >
      <Header />
      {/* upper container */}
      <div className="flex flex-col justify-between items-center w-full max-w-6xl gap-2">
        {/* lower container */}
        <div className="flex flex-col-reverse md:flex-row gap-12 md:gap-16">
          {/* content */}
          <div className="md:w-3/5 flex flex-col gap-8">
            <div className="self-center text-center md:self-start md:text-left ">
              <Typography className="text-5xl md:text-7xl font-semibold">
                <span className="text-blue-500">Improve</span> your{" "}
                <span>Skill</span> with Different Way
              </Typography>
            </div>
            <div className="self-center text-center md:self-start md:text-left text-sm md:text-base text-gray-600">
              Achieve CAT success with our Test Series, featuring high-quality
              questions and comprehensive analysis, all within a reduced time
              frame.
            </div>
            <div className="self-center text-center md:self-start md:text-left flex items-center gap-4">
              <Link href={"/signup"}>
                <Button size={matchMedia ? "lg" : "md"}>Take Test</Button>
              </Link>
            </div>
          </div>
          {/* content */}
          <div className="md:w-2/5 relative flex justify-center">
            <Image
              src="/assets/proctored.png"
              width={1000}
              height={1000}
              alt="Image"
              className="h-full w-full object-cover -mr-4 md:-mt-8 overflow-visible"
            />
          </div>
        </div>
      </div>
      {/* lower container */}
      <Card className="w-full overflow-hidden flex-col md:flex-row max-w-6xl mb-12">
        {/* content */}
        <CardBody className="w-full flex flex-col md:flex-row gap-8 justify-around">
          <div className="flex flex-col items-center justify-center gap-4">
            <span className="text-4xl font-bold text-yellow-600"> 1000+</span>
            Students
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <span className="text-4xl font-bold text-yellow-600"> 2000+</span>
            Test Taken
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <span className="text-4xl font-bold text-yellow-600"> 500+</span>
            Students Subscribed
          </div>
        </CardBody>
      </Card>
    </section>
  );
};

export default Home;
