import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Home from "./Pages/Home"
import Template from "./Assets/Template";
import Owners from "./Pages/Owners";
import Renters from "./Pages/Renters";
import Properties from "./Pages/Properties";
import NewContract from "./Pages/NewContract";
import Reports from "./Pages/Reports";
import Survey from "./Pages/Survey";
import Admin from './Pages/Admin'
import Register from './Pages/Register'

import Private from "./Private"
import Login from "./Pages/Login";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={
            <Private>
              <Template>
                <Home/>
              </Template>
            </Private>
          } /> 
          <Route path="/owners" element={
            <Private>
              <Owners/>
            </Private>
          } />
          <Route path="/renters" element={
            <Private>
              <Template>
                <Renters/>
              </Template>
            </Private>
          } />
          <Route path="/properties" element={
            <Private>
              <Template>
                <Properties/>
              </Template>
            </Private>
          } />
          <Route path="/newContract" element={
            <Private>
              <Template>
                <NewContract/>
              </Template>
            </Private>
          } />
          <Route path="/reports" element={
            <Private>
              <Template>
                <Reports/>
              </Template>
            </Private>
          } />
          <Route path="/survey" element={
            <Private>
              <Template>
                <Survey/>
              </Template>
            </Private>
          } />
          <Route path="/admin" element={
            <Private>
              <Template>
                <Admin/>
              </Template>
            </Private>
          } />
          <Route path="/register" element={
            <Private>
              <Template>
                <Register/>
              </Template>
            </Private>
          } />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
