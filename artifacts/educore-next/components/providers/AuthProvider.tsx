'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type UserRole = 'student' | 'teacher' | 'management'

interface AuthState {
  isLoggedIn: boolean
  role: UserRole | null
  login: (role: UserRole) => void
  logout: () => void
}

const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  role: null,
  login: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('educore_role')
    if (saved && ['student', 'teacher', 'management'].includes(saved)) {
      setRole(saved as UserRole)
    }
  }, [])

  const login = (r: UserRole) => {
    setRole(r)
    localStorage.setItem('educore_role', r)
  }

  const logout = () => {
    setRole(null)
    localStorage.removeItem('educore_role')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!role, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
