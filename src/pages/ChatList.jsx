import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_CHATS, CREATE_CHAT } from '../graphql/operations'
import { useNavigate } from 'react-router-dom'
import { useAuthenticationStatus } from '@nhost/react'

export default function ChatList() {
  const navigate = useNavigate()
  const { isLoading, isAuthenticated } = useAuthenticationStatus()
  const [title, setTitle] = useState('')
  const { data, loading, error, refetch } = useQuery(GET_CHATS, {
    skip: !isAuthenticated || isLoading, // 🚀 only fetch when logged in
  })

  const [createChat, { loading: creating, error: createError }] = useMutation(CREATE_CHAT, {
    onCompleted: (res) => {
      setTitle('')
      const newId = res?.insert_chats_one?.id
      if (newId) navigate(`/chat/${newId}`)
      else refetch()
    }
  })

  if (loading) return <p>Loading chats…</p>
  if (error) return <p style={{ color: 'red' }}>Error: {error.message}</p>

  return (
    <div style={{ maxWidth: 600, margin: '24px auto' }}>
      <h2>Your chats</h2>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Chat title"
          style={{ flex: 1 }}
        />
        <button
          disabled={!title.trim() || creating}
          onClick={() => createChat({ variables: { title: title.trim() } })}
        >
          New Chat
        </button>
      </div>
      {createError && <p style={{ color: 'red' }}>{createError.message}</p>}

      <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
        {data.chats.map(c => (
          <li key={c.id} style={{ padding: '8px 0', borderBottom: '1px solid #eee', cursor: 'pointer' }}
              onClick={() => navigate(`/chat/${c.id}`)}>
            <div style={{ fontWeight: 600 }}>{c.title}</div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              {new Date(c.created_at).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
