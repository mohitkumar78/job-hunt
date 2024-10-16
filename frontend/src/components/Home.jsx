import React from "react";
import Herosection from "./Herosection";
import Categorycarousel from "./Categorycarousel";
import LatestJob from "./LatestJob";
import useGetAllJob from "../Hook/useGetAllJob";
function Home() {
  useGetAllJob();
  return (
    <>
      <Herosection />
      <Categorycarousel />
      <LatestJob />
    </>
  );
}

export default Home;
