import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import Homepage from "../frontend/components/Homepage/Homepage";
import Loginpage from "../frontend/components/Login/Loginpage";
import Registerpage from "../frontend/components/Register/Registerpage";
=======
import Homepage from "../frontend/components/HomePage/Homepage";
import Loginpage from "../frontend/components/Login/Loginpage";
>>>>>>> refs/remotes/origin/main
const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Loginpage />}></Route>
<<<<<<< HEAD
          <Route path="/register" element={<Registerpage />}></Route>
=======
>>>>>>> refs/remotes/origin/main
        </Routes>
      </div>
    </BrowserRouter>
  );
};

const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(<App />);
