import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type PassengerInfoCardProps = {
  passengerInfo: { name: string; age: number } | null;
};

const PassengerInfoCard = ({ passengerInfo }: PassengerInfoCardProps) => {
  return (
    <div>
      <h3>Passenger Information</h3>
      {passengerInfo ? (
        <div>
          <p>
            <strong>Name:</strong> {passengerInfo.name}
          </p>
          <p>
            <strong>Age:</strong> {passengerInfo.age}
          </p>
        </div>
      ) : (
        <p>No passenger information provided.</p>
      )}
    </div>
  );
};

type PassengerFormInputs = {
  name: string;
  age: number;
};

type PassengerInfoFormProps = {
  onSave: (data: PassengerFormInputs) => void;
};

const PassengerInfoForm = ({ onSave }: PassengerInfoFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PassengerFormInputs>();

  const onSubmit: SubmitHandler<PassengerFormInputs> = (data) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input {...register("name", { required: "Name is required" })} />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          {...register("age", {
            required: "Age is required",
            valueAsNumber: true,
          })}
        />
        {errors.age && <p style={{ color: "red" }}>{errors.age.message}</p>}
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

type CheckoutProps = {
  passengerInfo: { name: string; age: number } | null;
  errorMessage?: string;
  onBook: () => void;
  onAddPassengerInfo: (data: { name: string; age: number }) => void;
};

export const Checkout = ({
  errorMessage,
  passengerInfo,
  onBook,
  onAddPassengerInfo,
}: CheckoutProps) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAddPassengerInfo = (data: PassengerFormInputs) => {
    onAddPassengerInfo(data);
    setIsFormVisible(false);
  };

  return (
    <div style={{ padding: 32 }}>
      <h1>Checkout Page</h1> <PassengerInfoCard passengerInfo={passengerInfo} />
      {isFormVisible ? (
        <PassengerInfoForm onSave={handleAddPassengerInfo} />
      ) : (
        <button onClick={() => setIsFormVisible(true)}>
          Add Passenger Information
        </button>
      )}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button onClick={onBook}>Book</button>
    </div>
  );
};
