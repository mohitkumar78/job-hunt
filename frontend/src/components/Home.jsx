import React from "react";
import Herosection from "./Herosection";
import Categorycarousel from "./Categorycarousel";
import LatestJob from "./LatestJob";
import useGetAllJob from "../Hook/useGetAllJob";
function Home() {
  useGetAllJob();
  return (
    <div>
      <Herosection />
      <Categorycarousel />
      <LatestJob />
    </div>
  );
}

export default Home;
