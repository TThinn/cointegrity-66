import React from "react";

const BlogHeader = () => {
  return (
    <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden bg-[#010822]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#010822]" />
      </div>

      <div className="relative z-10 text-lg font-normal flex flex-col justify-center gap-6 max-w-[90vw] xl:max-w-[1200px] mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            The Crypto Circuit
            <span className="bg-gradient-to-r from-[#d946ef] to-[#9333ea] bg-clip-text text-transparent"> Insights</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Weekly intelligence briefing from Cointegrity, Europe's leading Web3 consultancy, 
            translating complex regulatory developments and institutional crypto adoption into actionable insights.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogHeader;