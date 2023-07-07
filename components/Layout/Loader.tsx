import React, { useEffect, useState } from "react";

function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className={`loader ${!loading ? "loader--out" : ""}`}>
      <h1>loading...</h1>
    </section>
  );
}

export default Loader;
