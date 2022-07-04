import { Navigate, Route, Routes } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const { isAuthenticated } = useAuth();

  const HandleRedirect = () => {
    if (isAuthenticated) return <Dashboard />;
    return <Navigate to="/login" />;
  };

  return (
    <Routes>
      <Route path="/" element={<HandleRedirect />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
}

export default App;
