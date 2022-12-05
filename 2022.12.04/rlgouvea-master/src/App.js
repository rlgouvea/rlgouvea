import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Home from "./Pages/Home"
import Template from "./Assets/Template";
import Owners from "./Pages/Owners";
import Renters from "./Pages/Renters";
import Properties from "./Pages/Properties";
import NewContract from "./Pages/NewContract";
import Reports from "./Pages/Reports";
import Survey from "./Pages/Survey";

function App() {
  return (
    <BrowserRouter>
      <Template>
        <Routes>
          <Route path="/" element={<Home/>} /> 
          <Route path="/owners" element={<Owners/>} />
          <Route path="/renters" element={<Renters/>} />
          <Route path="/properties" element={<Properties/>} />
          <Route path="/newContract" element={<NewContract/>} />
          <Route path="/reports" element={<Reports/>} />
          <Route path="/survey" element={<Survey/>} />
        </Routes>
      </Template>
    </BrowserRouter>
  );
}

export default App;
