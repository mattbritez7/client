import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/account/Login";
import Register from "./components/account/Register";
import Home from "./components/home/Home";
import FormSell from "./components/formSell/FormSell";
import Details from "./components/details/Details";
import AuthProvider from "./auth/AuthProvider";
import Adm from "./components/account/Adm";
import Waiting from "./components/account/Waiting";
import Pendients from "./components/status/Pendients";
import Aprobate from "./components/status/Aprobate";
import Delivered from "./components/status/Delivered";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/waiting" element={<AuthProvider><Waiting/></AuthProvider>} />
        <Route path="/adm" element={<AuthProvider><Adm/></AuthProvider>} />
        <Route path="/sales" element={<AuthProvider><FormSell/></AuthProvider>} />
        <Route
          path="/sales/:id"
          element={
            <AuthProvider>
              <Details />
            </AuthProvider>
          }
        />
        <Route
          path="/all-sales"
          element={
            <AuthProvider>
              <Home />
            </AuthProvider>
          }
        />
        <Route path="/pendings" element={<AuthProvider><Pendients/></AuthProvider>} />
        <Route path="/aprobates" element={<AuthProvider><Aprobate/></AuthProvider>} />
        <Route path="/delivered" element={<AuthProvider><Delivered/></AuthProvider>} />

      </Routes>
    </div>
  );
}

export default App;
