import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import ProtectedRoute from "./routes/ProtectedRoute";
import { PERMISSIONS } from "./utils/utils/roles";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/users"
            element={
              <ProtectedRoute allowedRoles={PERMISSIONS.VIEW_USERS}>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
