import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { GET_CHAT, GET_MESSAGES, SEND_MESSAGE, SEND_BOT_MESSAGE } from '../graphql/operations'

export default function ChatPage() {
  const { chatId } = useParams()
  const [text, setText] = useState('')
  const bottomRef = useRef(null)

  // Load chat header (title)
  const { data: chatData } = useQuery(GET_CHAT, { variables: { chatId } })

  // Load messages
  const { data, loading, error, refetch } = useQuery(GET_MESSAGES, {
    variables: { chatId },
    fetchPolicy: 'cache-and-network'
  })

  const [sendMessage, { loading: sending }] = useMutation(SEND_MESSAGE, {
    onCompleted: () => {
      setText('')
      refetch()
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 0)
    }
  })

  const [sendBotMessage] = useMutation(SEND_BOT_MESSAGE, {
    onCompleted: () => {
      refetch()
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 0)
    }
  })

  useEffect(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 0)
  }, [data?.messages?.length])

  const onSend = async () => {
    const t = text.trim()
    if (!t) return

    // 1. Send user message
    await sendMessage({ variables: { chatId, text: t } })

    // 2. Simulate bot reply (after small delay)
    setTimeout(() => {
      sendBotMessage({
        variables: {
          chatId,
          text: `🤖 Bot says: I received your message - "${t}"`
        }
      })
    }, 1000) // 1 second delay to feel natural
  }

  if (loading && !data) return <p>Loading conversation…</p>
  if (error) return <p style={{ color: 'red' }}>Error: {error.message}</p>

  const messages = data?.messages ?? []
  const title = chatData?.chats_by_pk?.title || 'Chat'

  return (
    <div style={{ maxWidth: 720, margin: '16px auto', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)' }}>
      <h2 style={{ margin: '8px 0 16px' }}>{title}</h2>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        border: '1px solid #eee',
        borderRadius: 8,
        padding: 12,
        background: '#fafafa'
      }}>
        {messages.map(m => (
          <div key={m.id} style={{
            display: 'flex',
            justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start',
            marginBottom: 8
          }}>
            <div style={{
              maxWidth: '70%',
              padding: '8px 12px',
              borderRadius: 12,
              background: m.sender === 'user' ? '#d1eaff' : '#fff',
              border: '1px solid #e5e5e5',
              whiteSpace: 'pre-wrap',
              lineHeight: 1.4
            }}>
              <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 4 }}>{m.sender}</div>
              <div>{m.message}</div>
              <div style={{ fontSize: 11, opacity: 0.6, marginTop: 6 }}>
                {new Date(m.created_at).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type a message…"
          style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd' }}
          onKeyDown={e => e.key === 'Enter' ? onSend() : null}
        />
        <button onClick={onSend} disabled={sending || !text.trim()}>
          {sending ? 'Sending…' : 'Send'}
        </button>
      </div>
    </div>
  )
}
