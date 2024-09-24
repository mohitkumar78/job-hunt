import React from "react";
import Herosection from "./Herosection";
import Categorycarousel from "./Categorycarousel";
import LatestJob from "./LatestJob";
function Home() {
  return (
    <>
      <Herosection />
      <Categorycarousel />
      <LatestJob />
    </>
  );
}

export default Home;
