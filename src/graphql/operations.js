import { gql } from '@apollo/client'

/* ---------- CHATS ---------- */
export const GET_CHATS = gql`
  query GetChats {
    chats(order_by: { created_at: desc }) {
      id
      title
      created_at
    }
  }
`

export const CREATE_CHAT = gql`
  mutation CreateChat($title: String!) {
    insert_chats_one(object: { title: $title }) {
      id
      title
      created_at
    }
  }
`

export const GET_CHAT = gql`
  query GetChat($chatId: uuid!) {
    chats_by_pk(id: $chatId) {
      id
      title
      created_at
    }
  }
`

/* ---------- MESSAGES ---------- */
export const GET_MESSAGES = gql`
  query GetMessages($chatId: uuid!) {
    messages(
      where: { chat_id: { _eq: $chatId } }
      order_by: { created_at: asc }
    ) {
      id
      sender_id
      message
      is_bot
      created_at
    }
  }
`

export const SEND_MESSAGE = gql`
  mutation SendMessage($chatId: uuid!, $text: String!) {
    insert_messages_one(
      object: { chat_id: $chatId, message: $text, is_bot: false }
    ) {
      id
      chat_id
      sender_id
      message
      is_bot
      created_at
    }
  }
`

export const SEND_BOT_MESSAGE = gql`
  mutation SendBotMessage($chatId: uuid!, $text: String!) {
    insert_messages_one(
      object: { chat_id: $chatId, message: $text, is_bot: true }
    ) {
      id
      chat_id
      sender_id
      message
      is_bot
      created_at
    }
  }
`
