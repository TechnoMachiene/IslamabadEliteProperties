import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Suppress React DevTools browser message (not an error, just a suggestion)
if (typeof window !== 'undefined') {
  const originalWarn = console.info;
  console.info = function(...args: unknown[]) {
    if (typeof args[0] === 'string' && args[0].includes('Download the React DevTools')) {
      return; // Suppress this message
    }
    originalWarn.apply(console, args);
  };
}

createRoot(document.getElementById("root")!).render(<App />);
