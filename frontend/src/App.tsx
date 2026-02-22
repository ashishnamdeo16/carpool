import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import Layout from '@/components/Layout'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import RideDetail from '@/pages/RideDetail'
import DriverRides from '@/pages/DriverRides'
import CreateRide from '@/pages/CreateRide'
import DriverRequests from '@/pages/DriverRequests'
import Bookings from '@/pages/Bookings'
import Profile from '@/pages/Profile'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Search />} />
        <Route path="rides/:id" element={<RideDetail />} />
        <Route path="driver/rides" element={<ProtectedRoute><DriverRides /></ProtectedRoute>} />
        <Route path="driver/rides/new" element={<ProtectedRoute><CreateRide /></ProtectedRoute>} />
        <Route path="driver/requests" element={<ProtectedRoute><DriverRequests /></ProtectedRoute>} />
        <Route path="bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <Toaster position="top-right" richColors closeButton />
    </AuthProvider>
  )
}
