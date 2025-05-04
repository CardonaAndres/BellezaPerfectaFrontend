import Cookie from 'js-cookie'
import * as AuthAPI from '../../auth/API/auth'
import { createContext, useState, useContext, ReactNode, useEffect } from "react"
import { login } from "../../auth/ts/AuthTypes"
import { SuccessAlert } from '../components/alerts/SuccessAlert';
import { ErrorAlert } from '../components/alerts/ErrorAlert';

const isProduction = window.location.protocol === "https:";

type AuthContextType = {
  login: (data: login) => Promise<void>
  logout: () => Promise<void>
  isAuth: boolean
  loading: boolean
  user: object
  token: string
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuth, setIsAuth] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({})
  const [token, setToken] = useState("")

  const login = async (loginData: login) => {
    try {
      setLoading(true)
      const res = await AuthAPI.login(loginData)

      if (!res.status) throw new Error(res.message)

      setIsAuth(true)
      setUser(res.data.user)
      setToken(res.data.token)

      // Set cookies with additional options for iOS compatibility
      Cookie.set('token', res.data.token, {
        expires: 6 / 24, // 6 hours
        secure: isProduction, // Ensure cookies are only sent over HTTPS
        sameSite: 'Lax' // iOS compatibility
      })

      Cookie.set('user', JSON.stringify(res.data.user), {
        expires: 6 / 24,
        secure: isProduction,
        sameSite: 'Lax'
      })

      Cookie.set('isAuth', 'true', {
        expires: 6 / 24,
        secure: isProduction,
        sameSite: 'Lax'
      })

      SuccessAlert(res.data.message);

    } catch (err : any) {
      ErrorAlert(err.message)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true);
      Cookie.remove('token', { path: '/' })
      Cookie.remove('user', { path: '/' })
      Cookie.remove('isAuth', { path: '/' })
  
      setIsAuth(false)
      setUser({})
      setToken("")

      SuccessAlert('Sesión cerrada correctamente')
    } catch (err : any) {
      ErrorAlert(err.message)
    } finally {
      setLoading(false);
    }
  }

  // Check cookies on component mount (to restore session if available)
  useEffect(() => {
    setLoading(true)
    const token = Cookie.get('token')
    const user = Cookie.get('user')
    const isAuth = Cookie.get('isAuth')

    if (!isAuth || !token || !user) {
      setIsAuth(false)
      setUser({})
      setLoading(false)
      setToken("")
      return
    }

    const userObj = JSON.parse(user)

    setIsAuth(true)
    setUser(userObj)
    setToken(token)

    setLoading(false)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isAuth,
        loading,
        user,
        token
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
