'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type UserRole = 'student' | 'teacher' | 'management'

interface AuthState {
  isLoggedIn: boolean
  role: UserRole | null
  mounted: boolean
  login: (role: UserRole) => void
  logout: () => void
}

const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  role: null,
  mounted: false,
  login: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('educore_role')
      if (saved && ['student', 'teacher', 'management'].includes(saved)) {
        setRole(saved as UserRole)
      }
    } catch {}
    setMounted(true)
  }, [])

  const login = (r: UserRole) => {
    setRole(r)
    try { localStorage.setItem('educore_role', r) } catch {}
  }

  const logout = () => {
    setRole(null)
    try { localStorage.removeItem('educore_role') } catch {}
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!role, role, mounted, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
