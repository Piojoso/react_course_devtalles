import { useState } from "react";
import { MyTitle } from "./MyTitle";
import { MySubtitle } from "./MySubtitle";

export const MemoHook = () => {
  const [myTitle, setMyTitle] = useState("Hola Mundo");
  const [mySubtitle, setMySubytitle] = useState("Hello World");

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl font-thin text-white">MemoApp</h1>

      <MyTitle title={myTitle} />
      <MySubtitle subtitle={mySubtitle} />

      <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">
        Cambiar Título
      </button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">
        Cambiar SubTítulo
      </button>
    </div>
  );
};
