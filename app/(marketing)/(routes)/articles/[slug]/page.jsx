import "./page.css";

import { redirect } from "next/navigation";
import { articles } from "@/app/(marketing)/_components/data";
import Header from "@/app/(marketing)/_components/header";
import Footer from "@/app/(marketing)/_components/footer";

const ArticlePage = async ({ params }) => {
  const article = articles.find((article) => article.slug == params.slug);
  if (!article) redirect("/");
  return (
    <>
      <div className="flex flex-col items-center p-4 w-full border-b border-gray-100">
        <Header />
      </div>
      <div className="my-8 w-full">{article.content}</div>
      <Footer />
    </>
  );
};

export default ArticlePage;
