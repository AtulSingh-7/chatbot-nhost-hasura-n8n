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
      <div style={{ maxWidth: 420, margin: '40px auto' }}>
        <h2>Sign Up</h2>
        <input type="email" placeholder="Email" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} />
        <button onClick={() => signUpEmailPassword(signupEmail, signupPassword)}>Create account</button>

        <h2 style={{ marginTop: 24 }}>Login</h2>
        <input type="email" placeholder="Email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
        <button onClick={() => signInEmailPassword(loginEmail, loginPassword)}>Sign In</button>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #eee' }}>
        <strong>Chatbot</strong>
        <button onClick={signOut}>Logout</button>
      </div>

      <Routes>
        <Route path="/" element={<ChatList />} />
        <Route path="/chat/:chatId" element={<ChatPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
