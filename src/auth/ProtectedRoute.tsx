import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext/useAuth';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading…</p>;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
