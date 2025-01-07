'use client'

import Articles from "@/app/(marketing)/_components/articles";
import Features from "@/app/(marketing)/_components/features";
import Footer from "@/app/(marketing)/_components/footer";
import Home from "@/app/(marketing)/_components/home";
import Testimonial from "@/app/(marketing)/_components/testimonial";

export default function MarketingPage() {
  return (
    <main>
      <Home />
      <Articles />
      <Features />
      <Testimonial />
      <Footer />
    </main>
  );
}