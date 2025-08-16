// src/fetchSecureData.js
import nhost from './nhost'

export default async function fetchSecureData() {
  const token = await nhost.auth.getAccessToken()

  const res = await fetch(
    'https://wfjlnfvstthrpedudpew.hasura.eu-central-1.nhost.run/v1/graphql',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        query: `
          query {
            users {
              id
              email
            }
          }
        `
      })
    }
  )

  const { data, errors } = await res.json()
  if (errors) {
    console.error(errors)
  } else {
    console.log(data)
  }
}
