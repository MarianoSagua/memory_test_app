import { useState, useEffect } from "react";
import "./App.scss";
import "animate.css";
import Landing from "./components/Landing";
import Main from "./components/Main";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLanding(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showLanding ? <Landing /> : <Main />}
      <ToastContainer />
    </div>
  );
}

export default App;
