import { Navigate, Route, Routes } from "react-router-dom";
import useStore from "./hooks/useStore";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const { isAuthenticated } = useStore();

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
