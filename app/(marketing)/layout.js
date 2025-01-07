import { getCookie } from "@/utils/misc";
import { redirect } from "next/navigation";

const MarketingPageLayout = async ({ children }) => {
  const user = await getCookie("[BF USER]");

  if (user && user.id) {
    redirect("/dashboard/tests");
  }
  return <>{children}</>;
};

export default MarketingPageLayout;
