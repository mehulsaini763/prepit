import { Spinner } from "@/components/material-tailwind/components";

const Loading = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Spinner color="blue" className="h-8 w-8" />
    </div>
  );
};

export default Loading;
