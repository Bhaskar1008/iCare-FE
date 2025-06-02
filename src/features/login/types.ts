export interface LoginCredentials {
  agentCode: string
  termsAccepted: boolean
}

export interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => void
  isLoading?: boolean
}

export interface OtpVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  onVerify: (otp: string) => void
  isLoading?: boolean
}

export interface LoginPageProps {
  onLoginSuccess: () => void
  onRegister: () => void
}

export interface LoginState {
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
} 