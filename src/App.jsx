// App.jsx
import { useEffect } from "react";
import "./App.css";
import { Toaster } from 'react-hot-toast';
import AOS from "aos";
import "aos/dist/aos.css";

import Navigation from "./Routes/Navigation";

// const stripePromise = loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_PUBLIC_KEY);

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    // <Elements stripe={stripePromise}>
      <div>
        <Toaster />
        <Navigation />
      </div>
    // </Elements>
  );
}

export default App;
