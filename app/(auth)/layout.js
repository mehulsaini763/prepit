import { getCookie } from "@/utils/misc";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }) => {
  const user = await getCookie("[BF USER]");

  if (user && !user.id) {
    redirect("/signin");
  }

  return <>{children}</>;
};

export default AuthLayout;
