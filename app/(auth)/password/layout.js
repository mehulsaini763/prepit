/*  */import Image from "next/image";

const layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="hidden w-3/5 bg-blue-700 h-full md:flex flex-col justify-start items-start gap-4 p-12 text-gray-50">
        <div className="flex flex-col justify-center items-center w-full h-full">
          <Image
            alt="Image"
            src="/assets/security.png"
            width={1000}
            height={1000}
            className="w-96 h-96"
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default layout;
