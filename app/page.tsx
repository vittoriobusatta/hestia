import React from "react";
import ClientOnly from "./ClientOnly";

const Home = async () => {
  return (
    <>
      <ClientOnly>salut</ClientOnly>;
    </>
  );
};

export default Home;
