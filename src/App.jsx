import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "../frontend/components/Homepage/Homepage";
import Loginpage from "../frontend/components/Login/Loginpage";
import Registerpage from "../frontend/components/Register/Registerpage";
const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Loginpage />}></Route>
          <Route path="/register" element={<Registerpage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(<App />);
