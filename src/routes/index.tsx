import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { LoginPage } from '../features/login'
import { RegisterPage } from '../features/agent/registration'
import { DashboardPage } from '../features/dashboard'
import { AgentRegistrationForm } from '../features/agent/agentRegistrationForm'
import { AgentCreateAccount } from '../features/agent/agentCreateAccount'
import { AgentApplicationStatus } from '../features/agent/agentApplicationStatus'

// Protected route wrapper
const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  // Check if user is logged in - for now just a simple check
  // In a real app, this would likely use a context or state management
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }
  
  return <>{element}</>
}

// Create the router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />
  },
  {
    path: '/login',
    element: <LoginPage onLoginSuccess={() => {
      localStorage.setItem('isLoggedIn', 'true')
      window.location.href = '/dashboard'
    }} onRegister={() => {
      window.location.href = '/register'
    }} />
  },
  {
    path: '/register',
    element: <RegisterPage onBack={() => {
      window.location.href = '/login'
    }} />
  },
  {
    path: '/agent-registration',
    element: <Navigate to="/agent-registration/form" replace />
  },
  {
    path: '/agent-registration/form',
    element: <AgentRegistrationForm />
  },
  {
    path: '/agent-registration/account',
    element: <AgentCreateAccount />
  },
  {
    path: '/agent-registration/status',
    element: <AgentApplicationStatus />
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute element={<DashboardPage onLogout={() => {
      localStorage.removeItem('isLoggedIn')
      window.location.href = '/login'
    }} />} />
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />
  }
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
} 