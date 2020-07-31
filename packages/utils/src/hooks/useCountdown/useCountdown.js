import { useState, useEffect, useRef } from "react";

function useCountdown({ countdown, onCountdownEnd, reset }) {
  const [ct, setCountdown] = useState(countdown);
  const timer = useRef(null);

  useEffect(() => {
    if (reset) setCountdown(countdown);
    if (ct < 1) {
      setCountdown(countdown);
      onCountdownEnd();
    }
    clearInterval(timer.current);

    const countdownCounter = () => {
      setCountdown(ct - 1);
    };

    timer.current = setInterval(countdownCounter, 1000);

    return function cleanup() {
      clearInterval(timer);
    };
  }, [reset, ct, countdown, onCountdownEnd]);

  return ct;
}

export default useCountdown;
