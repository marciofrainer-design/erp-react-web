import { ToolsPage } from "../../pages/tools/ToolsPage";
import { useAuth } from "../../context/auth/useAuth";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function HomeRedirect() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/tools/app45" replace />;
  }

  return <Navigate to="/tools/login" replace />;
}

function ProtectedToolsRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/tools/login" replace />;
  }

  return <ToolsPage />;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/tools/login" element={<ToolsPage />} />
        <Route path="/tools/:tool/:form" element={<ProtectedToolsRoute />} />
        <Route path="/tools/:tool" element={<ProtectedToolsRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
