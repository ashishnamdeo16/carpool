import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { User, AuthResponse } from '@/types'
import { api } from '@/lib/api'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<AuthResponse>
  register: (data: { email: string; password: string; firstName: string; lastName: string; phone?: string }) => Promise<AuthResponse>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      setUser(null)
      setIsLoading(false)
      return
    }
    try {
      const { data } = await api.get<User>('/me')
      setUser(data)
      localStorage.setItem('user', JSON.stringify(data))
    } catch {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    const saved = localStorage.getItem('user')
    if (token && saved) {
      setUser(JSON.parse(saved))
      refreshUser()
    } else {
      setIsLoading(false)
    }
  }, [refreshUser])

  const login = async (email: string, password: string) => {
    const { data } = await api.post<AuthResponse>('/auth/login', { email, password })
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('user', JSON.stringify(data.user))
    setUser(data.user)
    return data
  }

  const register = async (data: { email: string; password: string; firstName: string; lastName: string; phone?: string }) => {
    const { data: res } = await api.post<AuthResponse>('/auth/register', data)
    localStorage.setItem('accessToken', res.accessToken)
    localStorage.setItem('user', JSON.stringify(res.user))
    setUser(res.user)
    return res
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
