import SuccesClient from "./SuccesClient";

function Checkout({ searchParams }: any) {

  return (
    <div className="landing">
      <SuccesClient searchParams={searchParams} />
    </div>
  );
}

export default Checkout;
