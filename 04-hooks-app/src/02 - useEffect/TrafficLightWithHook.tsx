import { useTrafficLight } from "../hooks/useTrafficLight";

export const TrafficLightWithHook = () => {
  const { light, countdown, colorClasses } = useTrafficLight({});

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-white text-3xl font-thin">
          Semáforo con useEffect
        </h1>
        <h2 className="text-white text-xl ">{countdown}</h2>
        <div className="w-64 bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${(countdown / 5) * 100}%` }}
          ></div>
        </div>

        <div
          className={`w-32 h-32 ${light === "red" ? colorClasses[light] : "bg-gray-500"} rounded-full`}
        />
        <div
          className={`w-32 h-32 ${light === "yellow" ? colorClasses[light] : "bg-gray-500"} rounded-full`}
        />
        <div
          className={`w-32 h-32 ${light === "green" ? colorClasses[light] : "bg-gray-500"} rounded-full`}
        />
      </div>
    </div>
  );
};
