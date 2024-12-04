import { useState } from "react";
import { CheckoutState } from "./containers/checkout-state";
import { CheckoutZustand } from "./containers/checkout-zustand";

const App = () => {
  const [tab, setTab] = useState<"state" | "zustand" | "react-hook-form">(
    "state",
  );
  return (
    <div>
      <button
        style={{ background: tab === "state" ? "lightblue" : "lightgrey" }}
        onClick={() => setTab("state")}
      >
        state
      </button>
      <button
        style={{ background: tab === "zustand" ? "lightblue" : "lightgrey" }}
        onClick={() => setTab("zustand")}
      >
        zustand
      </button>
      <button
        style={{
          background: tab === "react-hook-form" ? "lightblue" : "lightgrey",
        }}
        onClick={() => setTab("react-hook-form")}
      >
        react-hook-form
      </button>
      {tab === "state" && <CheckoutState />}
      {tab === "zustand" && <CheckoutZustand />}
    </div>
  );
};

export default App;
