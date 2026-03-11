import { useState } from "react";

// type Color = "red" | "yellow" | "green";

// const colorClasses: Record<Color, string> = {
const colorClasses = {
  red: "bg-red-500 animate-pulse",
  yellow: "bg-yellow-500 animate-pulse",
  green: "bg-green-500 animate-pulse",
};

type Color = keyof typeof colorClasses;

export const TrafficLight = () => {
  const [light, setLight] = useState<Color>("red");

  const handleColorChange = (color: Color) => {
    setLight((prev) => {
      console.log({ previous_value: prev });
      return color;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-8">
        <div
          className={`w-32 h-32 ${light === "red" ? colorClasses[light] : "bg-gray-500"} rounded-full`}
        />
        <div
          className={`w-32 h-32 ${light === "yellow" ? colorClasses[light] : "bg-gray-500"} rounded-full`}
        />
        <div
          className={`w-32 h-32 ${light === "green" ? colorClasses[light] : "bg-gray-500"} rounded-full`}
        />

        {/* Botón para cambiar el estado de la luz */}
        <div className="flex gap-2">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={() => handleColorChange("red")}
          >
            Rojo
          </button>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={() => handleColorChange("yellow")}
          >
            Amarillo
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={() => handleColorChange("green")}
          >
            Verde
          </button>
        </div>
      </div>
    </div>
  );
};
