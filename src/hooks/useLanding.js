import { useEffect, useState } from "react";

export const useLanding = () => {
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLanding(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return {
    showLanding,
  };
};
