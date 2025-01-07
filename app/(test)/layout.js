import { getCookie } from "@/utils/misc";
import { redirect } from "next/navigation";

const TestLayout = async ({ children }) => {
  const user = await getCookie("[BF USER]");

  if (user && !user.id) {
    redirect("/signin");
  }
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center min-w-[960px]">
      {children}
    </main>
  );
};

export default TestLayout;
