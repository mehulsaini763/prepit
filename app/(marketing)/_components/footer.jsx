import { Typography } from "@/components/material-tailwind/components";
import {
  EnvelopeIcon,
  HomeIcon,
  MinusSmallIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div
        id="footer"
        className="flex flex-col md:flex-row items-start px-4 gap-8 py-8 justify-between md:px-28 md:py-12 bg-blue-800 w-full text-white"
      >
        <div className="md:w-1/3 flex flex-col items-center">
          <div className="flex flex-col gap-4">
            <Typography variant="h4">Basic Funda</Typography>
            <Typography variant="paragraph" className="leading-relaxed font-medium">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              dolor eveniet tenetur ullam velit eos voluptas necessitatibus,
              impedit ab cupiditate magni voluptatum error consequuntur.
            </Typography>
          </div>
        </div>
        <div className="md:w-1/3 flex flex-col gap-4 items-center">
          <div className="flex flex-col gap-4">
            <Typography variant="h4">Quick Links</Typography>
            <div className="flex flex-col gap-1">
              <Link href={"/#home"}>
                <Typography variant="paragraph" className="font-medium"> Home</Typography>
              </Link>
              <Link href={"#articles"}>
                <Typography variant="paragraph" className="font-medium"> Articles</Typography>
              </Link>
              <Link href={"/#testimonials"}>
                <Typography variant="paragraph" className="font-medium"> Testimonials</Typography>
              </Link>
              <Link href={"#"}>
                <Typography variant="paragraph" className="font-medium"> Terms & Conditions</Typography>
              </Link>
              <Link href={"#"}>
                <Typography variant="paragraph" className="font-medium">
                  Privacy and Refund Policy
                </Typography>
              </Link>
            </div>
          </div>
        </div>
        <div className="md:w-1/3 flex flex-col gap-4 items-center">
          <div className="flex flex-col gap-4">
            <Typography variant="h4">Connect with Us</Typography>
            <div className="flex items-center gap-2">
              <HomeIcon className="h-5 w-5 mb-1" />
              <Typography variant="paragraph" className="font-medium">Noida, UP, India</Typography>
            </div>
            <div className="flex items-center gap-2">
              <EnvelopeIcon className="h-5 w-5 mb-1" />
              <Typography variant="paragraph" className="font-medium">basicfunda.guru@gmail.com</Typography>
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-5 w-5 mb-1" />
              <Typography variant="paragraph" className="font-medium">+91 90099 90099</Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-900 text-sm p-2 text-center text-white">
        © 2024 Sotel Solutions Private Limited. Platform Designed by{" "}
        <Link className="font-semibold" href={"https://wecofy.com "}>
          Wecofy
        </Link>
      </div>
    </>
  );
};

export default Footer;
