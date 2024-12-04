import { Checkout } from "../components/checkout";
import { create } from "zustand";

type CheckoutState = {
  passengerInfo: { name: string; age: number } | null;
  errorMessage: string;
  onAddPassengerInfo: (info: { name: string; age: number }) => void;
  onBook: (opts: { onError: () => void; onSuccess: () => void }) => void;
};

export const useCheckoutStore = create<CheckoutState>((set, get) => ({
  passengerInfo: null,
  errorMessage: "",
  onAddPassengerInfo: (info) => {
    set({ passengerInfo: info, errorMessage: "" });
  },
  onBook: ({ onError, onSuccess }) => {
    const passengerInfo = get().passengerInfo;
    if (!passengerInfo) {
      set({
        errorMessage: "Please provide passenger information before booking.",
      });
      onError();
    } else {
      set({ errorMessage: "" });
      onSuccess();
    }
  },
}));

export const CheckoutZustand = () => {
  const passengerInfo = useCheckoutStore((state) => state.passengerInfo);
  const errorMessage = useCheckoutStore((state) => state.errorMessage);
  const onAddPassengerInfo = useCheckoutStore(
    (state) => state.onAddPassengerInfo,
  );
  const onBook = useCheckoutStore((state) => state.onBook);

  const handleBook = () => {
    onBook({
      onError: () => {
        // things shouldn't be handled in state machine
      },
      onSuccess: () => {
        alert("Booking successful!");
      },
    });
  };

  return (
    <Checkout
      passengerInfo={passengerInfo}
      errorMessage={errorMessage}
      onAddPassengerInfo={onAddPassengerInfo}
      onBook={handleBook}
    />
  );
};
