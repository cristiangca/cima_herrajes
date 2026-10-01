import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft,
  FiArrowRight, FiLoader, FiAlertCircle
} from 'react-icons/fi'
import '../styles/login.css'
import logo from '../assets/cima.jpg'

export default function Login() {
  const navigate = useNavigate()

  const [paso, setPaso] = useState('email')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mostrarPass, setMostrarPass] = useState(false)
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const handleSiguiente = (e) => {
    e.preventDefault()
    setError('')

    if (paso === 'email') {
      if (!email.trim()) return setError('Ingresa tu correo')
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Correo no válido')
      setPaso('password')
      return
    }

    if (!password.trim()) return setError('Ingresa tu contraseña')
    if (password.length < 4) return setError('Contraseña muy corta')

    setCargando(true)
    setTimeout(() => {
      setCargando(false)
      navigate('/catalogo')
    }, 700)
  }

  const handleVolver = () => {
    setPaso('email')
    setPassword('')
    setError('')
    setMostrarPass(false)
  }

  return (
    <div className="login-container">
      <div className="login-box">

        <div className="login-logo">
          <img src={logo} alt="Cima Herrajes" />
        </div>

        <h1>Cima Herrajes</h1>
        <p className="login-sub">
          {paso === 'email' ? 'Inicia sesión para continuar' : 'Ingresa tu contraseña'}
        </p>

        <form className="login-form" onSubmit={handleSiguiente}>

          {paso === 'email' ? (
            <div className="login-step" key="email">
              <div className="login-field">
                <FiMail size={18} className="field-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  autoFocus
                  autoComplete="email"
                />
              </div>
            </div>
          ) : (
            <div className="login-step" key="password">
              <div className="login-user">
                <div className="login-user-info">
                  <FiMail size={14} />
                  <span>{email}</span>
                </div>
                <button
                  type="button"
                  className="btn-back"
                  onClick={handleVolver}
                  aria-label="Volver"
                >
                  <FiArrowLeft size={16} />
                </button>
              </div>

              <div className="login-field">
                <FiLock size={18} className="field-icon" />
                <input
                  type={mostrarPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoFocus
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="field-toggle"
                  onClick={() => setMostrarPass(v => !v)}
                  aria-label={mostrarPass ? 'Ocultar' : 'Mostrar'}
                >
                  {mostrarPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="login-error">
              <FiAlertCircle size={14} /> {error}
            </div>
          )}

          <button
            type="submit"
            className="login-submit"
            disabled={cargando}
          >
            {cargando ? (
              <>
                <FiLoader size={18} className="spin" /> Ingresando...
              </>
            ) : paso === 'email' ? (
              <>
                Continuar <FiArrowRight size={18} />
              </>
            ) : (
              <>
                Ingresar <FiArrowRight size={18} />
              </>
            )}
          </button>

        </form>

        <div className="login-foot">
          ¿No tienes cuenta? <span>Contacta al administrador</span>
        </div>

      </div>
    </div>
  )
}