import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "../frontend/components/HomePage/Homepage";
import Loginpage from "../frontend/components/Login/Loginpage";
const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Loginpage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(<App />);
