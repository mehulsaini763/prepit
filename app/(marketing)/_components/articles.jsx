import CustomCarousel from "@/app/(marketing)/_components/custom-carousel";

const Articles = () => {
  return (
    <section
      id="articles"
      className="bg-blue-gray-50 flex flex-col justify-center items-center w-full md:min-h-screen"
    >
      {/* container */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-x-4 md:gap-y-16 mx-2 my-16 md:p-4 w-full max-w-6xl ">
        {/* content */}
        <div className="w-full md:w-1/3">
          <div className="flex flex-col justify-center items-center w-full h-full px-4 md:p-0">
            <p className="text-3xl md:text-4xl font-semibold">
              Can Yoga Help in Cracking the CAT?
            </p>
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <CustomCarousel />
        </div>
      </div>
    </section>
  );
};

export default Articles;
