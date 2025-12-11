import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxios from "../../../Hooks/UseAxios/useAxios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  console.log(sessionId);
  const axiosSecure = useAxios();
  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => console.log(res.data));
    }
  }, [sessionId, axiosSecure]);

  return (
    <>
      <div>
        <h2>congo! you have successfully paid</h2>
      </div>
    </>
  );
};

export default PaymentSuccess;
