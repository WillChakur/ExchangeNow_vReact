import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Homepage from "../frontend/components/Homepage/Homepage";
import Loginpage from "../frontend/components/Login/Loginpage";
import Registerpage from "../frontend/components/Register/Registerpage";
import Accountpage from "../frontend/components/Account/Accountpage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Loginpage />}></Route>
            <Route path="/register" element={<Registerpage />}></Route>
            <Route path="/account" element={<Accountpage />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(<App />);
