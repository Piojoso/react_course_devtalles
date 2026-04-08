import { useCallback, useState } from "react";
import { MyTitle } from "./MyTitle";
import { MySubtitle } from "./MySubtitle";

// Outside of the component, we don't need to use useCallback, because it won't be re-rendered
// const handleCallMyAPI = () => {
//   console.log("Llamar a mi API");
// };

export const MemoHook = () => {
  const [myTitle, setMyTitle] = useState("Hola Mundo");
  const [mySubtitle, setMySubytitle] = useState("Hello World");

  // Inside of the component, we need to use useCallback, because if not, it will be re-rendered
  const handleCallMyAPI = useCallback(() => {
    console.log("Llamar a mi API", mySubtitle);
  }, [mySubtitle]);

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl font-thin text-white">MemoApp</h1>

      <MyTitle title={myTitle} />
      <MySubtitle subtitle={mySubtitle} callMyAPI={handleCallMyAPI} />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => setMyTitle("Ciao Mondo, " + new Date().getTime())}
      >
        Cambiar Título
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => setMySubytitle("Konnichiwa, Sekai")}
      >
        Cambiar SubTítulo
      </button>
    </div>
  );
};
