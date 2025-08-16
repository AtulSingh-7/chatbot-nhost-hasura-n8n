import React, { useState } from 'react'
import {
  useAuthenticationStatus,
  useSignUpEmailPassword,
  useSignInEmailPassword,
  useSignOut
} from '@nhost/react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ChatList from './pages/ChatList'
import ChatPage from './pages/ChatPage'

export default function App() {
  const { isAuthenticated } = useAuthenticationStatus()
  const { signOut } = useSignOut()
  const { signUpEmailPassword } = useSignUpEmailPassword()
  const { signInEmailPassword } = useSignInEmailPassword()

  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  if (!isAuthenticated) {
    return (
      <div
        style={{
          maxWidth: 800,
          margin: '40px auto',
          padding: '24px',
          border: '1px solid #ddd',
          borderRadius: 8,
          boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: 32 }}>Welcome to Chatbot</h2>

        <div style={{ display: 'flex', gap: 40 }}>
          {/* Sign Up */}
          <div style={{ flex: 1 }}>
            <h3>Sign Up</h3>
            <input
              type="email"
              placeholder="Email"
              value={signupEmail}
              onChange={e => setSignupEmail(e.target.value)}
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Password"
              value={signupPassword}
              onChange={e => setSignupPassword(e.target.value)}
              style={inputStyle}
            />
            <button
              onClick={() => signUpEmailPassword(signupEmail, signupPassword)}
              style={buttonStyle}
            >
              Create Account
            </button>
          </div>

          {/* Login */}
          <div style={{ flex: 1 }}>
            <h3>Login</h3>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={e => setLoginEmail(e.target.value)}
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={e => setLoginPassword(e.target.value)}
              style={inputStyle}
            />
            <button
              onClick={() => signInEmailPassword(loginEmail, loginPassword)}
              style={buttonStyle}
            >
              Sign In
            </button>
          </div>
        </div>

        <p style={{ marginTop: 32, fontSize: 14, color: '#666', textAlign: 'center' }}>
          📧 Please note: The verification email might land in your <strong>Spam</strong> folder.  
          Don’t forget to check there!
        </p>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',   // keeps button vertically centered
    padding: '12px 16px',
    borderBottom: '1px solid #eee',
    fontFamily: 'Arial, sans-serif'
  }}
>
  <strong>Chatbot</strong>
  <button
    onClick={signOut}
    style={navButtonStyle}
    onMouseEnter={e => Object.assign(e.target.style, navButtonHover)}
    onMouseLeave={e => Object.assign(e.target.style, navButtonStyle)}
  >
    Logout
  </button>
</div>

      <Routes>
        <Route path="/" element={<ChatList />} />
        <Route path="/chat/:chatId" element={<ChatPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '8px 0',
  borderRadius: 4,
  border: '1px solid #ccc',
  fontSize: 14
}

// Add a new style for navbar buttons
const navButtonStyle = {
  padding: '6px 12px',
  border: '1px solid #4CAF50',
  borderRadius: 4,
  background: '#fff',
  color: '#4CAF50',
  fontSize: 14,
  cursor: 'pointer',
  transition: '0.2s',
}

const navButtonHover = {
  background: '#4CAF50',
  color: '#fff'
}


const buttonStyle = {
  width: '100%',
  padding: '10px',
  marginTop: 8,
  border: 'none',
  borderRadius: 4,
  background: '#4CAF50',
  color: '#fff',
  fontSize: 16,
  cursor: 'pointer'
}
