import React from "react";
import ClientOnly from "./ClientOnly";
import getCurrentUser from "./actions/getCurrentUser";

const Home = async () => {
  const currentUser = await getCurrentUser();
  return (
    <>
      <ClientOnly>
        {currentUser ? (
          <div>
            <h1>Welcome back, {currentUser.name}!</h1>
          </div>
        ) : (
          <div>
            <h1>Welcome to Hestia!</h1>
          </div>
        )}
      </ClientOnly>
    </>
  );
};

export default Home;
