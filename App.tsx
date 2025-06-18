
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserRole } from './types';
import { ROUTE_PATHS } from './constants';
import Navbar from './components/shared/Navbar';
import ProtectedRoute from './components/shared/ProtectedRoute';
import AuthPage from './components/AuthPage';
import PatientDashboard from './components/dashboards/PatientDashboard';
import DoctorDashboard from './components/dashboards/DoctorDashboard';
import AdminDashboard from './components/dashboards/AdminDashboard';
import { useAuth } from './contexts/AuthContext';
import { Spinner } from './components/common/UIPrimitives';


const App: React.FC = () => {
  const { isLoading, currentUser } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          {/* Public routes */}
          <Route path={ROUTE_PATHS.LOGIN} element={!currentUser ? <AuthPage /> : <Navigate to={ROUTE_PATHS.HOME} />} />
          <Route path={ROUTE_PATHS.REGISTER} element={!currentUser ? <AuthPage /> : <Navigate to={ROUTE_PATHS.HOME} />} />
          
          {/* Redirect home based on role or to login */}
          <Route 
            path={ROUTE_PATHS.HOME} 
            element={
              currentUser ? (
                currentUser.role === UserRole.ADMIN ? <Navigate to={ROUTE_PATHS.ADMIN_DASHBOARD} /> :
                currentUser.role === UserRole.DOCTOR ? <Navigate to={ROUTE_PATHS.DOCTOR_DASHBOARD} /> :
                currentUser.role === UserRole.PATIENT ? <Navigate to={ROUTE_PATHS.PATIENT_DASHBOARD} /> :
                <Navigate to={ROUTE_PATHS.LOGIN} />
              ) : (
                <Navigate to={ROUTE_PATHS.LOGIN} />
              )
            } 
          />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={[UserRole.PATIENT]} />}>
            <Route path={`${ROUTE_PATHS.PATIENT_DASHBOARD}/*`} element={<PatientDashboard />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={[UserRole.DOCTOR]} />}>
            <Route path={`${ROUTE_PATHS.DOCTOR_DASHBOARD}/*`} element={<DoctorDashboard />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]} />}>
            <Route path={`${ROUTE_PATHS.ADMIN_DASHBOARD}/*`} element={<AdminDashboard />} />
          </Route>
          
          {/* Fallback for unmatched routes */}
          <Route path="*" element={<Navigate to={ROUTE_PATHS.HOME} />} />
        </Routes>
      </main>
      <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
        <p>&copy; {new Date().getFullYear()} MediConnect HMS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
