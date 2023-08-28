import React from "react";

export type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className=" max-w-2xl flex flex-col mx-auto py-4 md:py-8 space-y-6 px-4 md:space-y-12">
      <h1 className=" text-2xl md:text-3xl text-center">
        FYB 22/23 QUESTIONNAIRE
      </h1>
      {children}
    </div>
  );
};

export default Layout;
