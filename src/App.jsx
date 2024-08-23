import { createRoot } from "react-dom/client";
import Header from "../frontend/components/Header";
import Main from "../frontend/components/Main";

const App = () => {
  return (
    <div>
      <Header />
      <Main />
    </div>
  );
};

const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(<App />);
