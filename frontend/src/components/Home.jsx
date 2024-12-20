import React from "react";
import Herosection from "./Herosection";
import Categorycarousel from "./Categorycarousel";
import LatestJob from "./LatestJob";

function Home() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="py-16 text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
        <Herosection />
      </section>

      {/* Category Carousel */}
      <section className="py-10 bg-white shadow-md">
        <div className="container px-4 mx-auto">
          <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
            Explore Categories
          </h2>
          <Categorycarousel />
        </div>
      </section>

      {/* Latest Job Section */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 mx-auto">
          <LatestJob />
        </div>
      </section>
    </div>
  );
}

export default Home;
