import React from "react";
import Header from "./_components/layout/header";
import Footer from "./_components/layout/footer";

const TestingLayout = ({ children }) => {
  return (
    <div className="w-full h-screen flex flex-col overflow-hidden select-none">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default TestingLayout;
