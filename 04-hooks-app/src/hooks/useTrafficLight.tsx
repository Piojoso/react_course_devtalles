import { useEffect, useState } from "react";

interface Props {
  initialColor?: Color;
  countdownDuration?: number;
}

const colorClasses = {
  red: "bg-red-500 animate-pulse",
  yellow: "bg-yellow-500 animate-pulse",
  green: "bg-green-500 animate-pulse",
};

type Color = keyof typeof colorClasses;

export const useTrafficLight = ({
  initialColor = "red",
  countdownDuration = 5,
}: Props) => {
  const [light, setLight] = useState<Color>(initialColor);
  const [countdown, setCountdown] = useState(countdownDuration);

  useEffect(() => {
    if (countdown === 0) return;

    const intervalId = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [countdown]);

  useEffect(() => {
    if (countdown > 0) return;

    setCountdown(5);

    if (light === "red") setLight("green");
    if (light === "green") setLight("yellow");
    if (light === "yellow") setLight("red");
    return;
  }, [countdown, light]);

  return {
    // Props
    light,
    countdown,

    // Methods
    colorClasses,
  };
};
