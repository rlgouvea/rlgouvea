import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Home from "./Pages/Home"
import Template from "./Assets/Template";
import Owners from "./Pages/Owners";
import Renters from "./Pages/Renters";
import Properties from "./Pages/Properties";
import NewContract from "./Pages/NewContract";
import Reports from "./Pages/Reports";
import Survey from "./Pages/Survey";

import Private from "./Private"

function App() {
  return (
    <BrowserRouter>
      <Template>
        <Routes>
          <Route path="/" element={<Home/>} /> 
          <Route path="/owners" element={
            <Private>
              <Owners/>
            </Private>
          } />
          <Route path="/renters" element={
          <Private>
            <Renters/>
          </Private>
          } />
          <Route path="/properties" element={
          <Private>
            <Properties/>
          </Private>
          } />
          <Route path="/newContract" element={
          <Private>
            <NewContract/>
          </Private>
          } />
          <Route path="/reports" element={
          <Private>
            <Reports/>
          </Private>
          } />
          <Route path="/survey" element={
          <Private>
            <Survey/>
          </Private>
          } />
        </Routes>
      </Template>
    </BrowserRouter>
  );
}

export default App;
