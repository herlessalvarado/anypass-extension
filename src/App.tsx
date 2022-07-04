import useAuth from "./hooks/useAuth";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const { isAuthenticated } = useAuth();

  const handleRoutes = () => {
    if (isAuthenticated) return <Dashboard />;
    return <Login />;
  };
  return handleRoutes();
}

export default App;
