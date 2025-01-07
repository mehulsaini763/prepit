import { Suspense } from "react";
import Loading from "./loading";

const RoutesLayout = ({ children }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default RoutesLayout;
