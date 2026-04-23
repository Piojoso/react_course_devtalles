import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Button } from "./components/ui/button";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <h1 className="text-3xl underline font-bold"> Hola Mundo </h1>
    <Button variant="outline">Click me!</Button>
  </StrictMode>,
);
