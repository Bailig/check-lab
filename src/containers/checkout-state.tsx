import { useState } from "react";
import { Checkout } from "../components/checkout";

export const CheckoutState = () => {
  const [passengerInfo, setPassengerInfo] = useState<{
    name: string;
    age: number;
  } | null>(null);
  const [error, setError] = useState("");

  const handleSavePassengerInfo = (data: { name: string; age: number }) => {
    setPassengerInfo(data);
    setError("");
  };

  const handleBook = () => {
    if (!passengerInfo) {
      setError("Please provide passenger information before booking.");
    } else {
      alert("Booking successful!");
      setError("");
    }
  };

  return (
    <Checkout
      passengerInfo={passengerInfo}
      errorMessage={error}
      onAddPassengerInfo={handleSavePassengerInfo}
      onBook={handleBook}
    />
  );
};
