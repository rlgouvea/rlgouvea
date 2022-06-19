import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Home from "./Pages/Home"
import Template from "./Assets/Template";
import Owners from "./Pages/Owners";
import Renters from "./Pages/Renters";
import Properties from "./Pages/Properties";

function App() {
  return (
    <BrowserRouter>
      <Template>
        <Routes>
          <Route path="/" element={<Home/>} /> 
          <Route path="/owners" element={<Owners/>} />
          <Route path="/renters" element={<Renters/>} />
          <Route path="/properties" element={<Properties/>} />
        </Routes>
      </Template>
    </BrowserRouter>
  );
}

export default App;
