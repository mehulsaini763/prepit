import {
  AdjustmentsHorizontalIcon,
  ChartBarIcon,
  ComputerDesktopIcon,
  LightBulbIcon,
} from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

const Features = () => {
  const matchMedia = useMediaQuery({ query: "(max-width:920px)" });
  return (
    <section
      id="features"
      className="flex justify-center items-start w-full md:min-h-screen"
    >
      {/* container */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-16 mx-4 my-16 max-w-6xl">
        {/* content */}
        <div className="md:w-2/2 p-8">
          <Image
            src={"/assets/learning.svg"}
            width={500}
            height={500}
            alt="Image"
            className="h-80 w-80"
          />
        </div>
        <div className="md:w-3/5 flex flex-col justify-center gap-8">
          <Typography variant={matchMedia ? "h3" : "h2"}>
            Make your Learning Enjoyable
          </Typography>
          <Typography variant="paragraph">
            Set the way of learning according to your wishes with some of the
            benefits that you get us, so you on enjoy the lessons that we
            provide.
          </Typography>
          <div className="grid px-4 md:px-0 md:grid-cols-2 gap-8 md:gap-10">
            <div className="flex items-start gap-4">
              <div className="self-center">
                <ChartBarIcon className="w-6 h-6 text-blue-500 mx-2" />
              </div>
              <div>
                <Typography variant="h6">
                  Realistic Mock Test Environment
                </Typography>
                <Typography variant="small">
                  Get comprehensive reports and analytics to track and improve
                  your performance.
                </Typography>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="self-center">
                <ComputerDesktopIcon className="w-6 h-6 text-blue-500 mx-2" />
              </div>
              <div>
                <Typography variant="h6">
                  Detailed Performance Reports
                </Typography>
                <Typography variant="small">
                  Practice in a test environment that closely mirrors the
                  original CAT exam.
                </Typography>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="self-center">
                <AdjustmentsHorizontalIcon className="w-6 h-6 text-blue-500 mx-2" />
              </div>
              <div>
                <Typography variant="h6">Customized Test Options</Typography>
                <Typography variant="small">
                  Choose from topic-specific, section-focused, mini, and
                  full-length mock tests.
                </Typography>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="self-center">
                <LightBulbIcon className="w-6 h-6 text-blue-500 mx-2" />
              </div>
              <div>
                <Typography variant="h6">Adaptive Learning</Typography>
                <Typography variant="small">
                  Experience an adaptive platform that adjusts question
                  difficulty based on your performance.
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
