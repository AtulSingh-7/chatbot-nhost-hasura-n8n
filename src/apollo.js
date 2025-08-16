// src/apollo.js
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import nhost from './nhost.js'

const httpLink = createHttpLink({
  uri: 'https://wfjlnfvstthrpedudpew.graphql.eu-central-1.nhost.run/v1'
})

const authLink = setContext(async (_, { headers }) => {
  const token = await nhost.auth.getAccessToken()
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})
