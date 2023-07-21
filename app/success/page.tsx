import SuccesClient from "./SuccesClient";

function Checkout({ searchParams }: any) {
  console.log(searchParams);

  return (
    <div className="landing">
      <SuccesClient searchParams={searchParams} />
    </div>
  );
}

export default Checkout;
