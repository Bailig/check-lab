import React from "react";
import { useForm } from "react-hook-form";
import { Checkout } from "../components/checkout";

export const CheckoutHookForm = () => {
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useForm<{
    name: string;
    age: number;
  }>({
    defaultValues: {
      name: "",
      age: undefined,
    },
  });

  const [error, setError] = React.useState("");

  const handleSavePassengerInfo = (data: { name: string; age: number }) => {
    setValue("name", data.name);
    setValue("age", data.age);
    setError("");
  };

  const handleBook = () => {
    const passengerInfo = getValues();
    if (!passengerInfo.name || !passengerInfo.age) {
      setError("Please provide passenger information before booking.");
    } else {
      alert("Booking successful!");
      setError("");
    }
  };

  return (
    <Checkout
      passengerInfo={getValues().name ? getValues() : null}
      errorMessage={error || errors.name?.message || errors.age?.message || ""}
      onAddPassengerInfo={handleSavePassengerInfo}
      onBook={handleBook}
    />
  );
};
