import { getCookie } from "@/utils/misc";
import { redirect } from "next/navigation";

const SignUpLayout = async ({ children }) => {
  const user = await getCookie("[PI USER]");

  if (user && user.id) {
    redirect("/dashboard/tests");
  }

  return <>{children}</>;
};

export default SignUpLayout;
