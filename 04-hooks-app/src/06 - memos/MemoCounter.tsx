import { useCounter } from "@/hooks/useCounter";
import { useMemo } from "react";

const heavyStuff = (iterationNumber: number) => {
  console.time("Heavy struff started");

  for (let index = 0; index < iterationNumber; index++) {
    console.log(`there we go`);
  }

  console.timeEnd("Heavy struff started");

  return `${iterationNumber} realized iterations`;
};

export const MemoCounter = () => {
  const { counter, increment } = useCounter(40_000);
  const { counter: counter2, increment: increment2 } = useCounter(10);

  const myHeavyValue = useMemo(() => heavyStuff(counter), [counter]);

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Memo - useMemo {myHeavyValue}</h1>
      <hr />

      <h4>Counter: {counter}</h4>
      <h4>Counter2: {counter2}</h4>

      <button
        className="bg-indigo-600 px-4 py-2 rounded-md cursor-pointer"
        onClick={increment}
      >
        Counter +1
      </button>

      <button
        className="bg-indigo-600 px-4 py-2 rounded-md cursor-pointer"
        onClick={increment2}
      >
        Counter2 +1
      </button>
    </div>
  );
};
