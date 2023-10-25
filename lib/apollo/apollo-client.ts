import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const httpUserLink = createHttpLink({
  uri: process.env.NEXT_APP_GQL_USER_API ?? 'http://localhost:3000/graphql',
})
const authUserLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'user-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  }
})

const uploadLink = createUploadLink({
  uri: process.env.NEXT_APP_GQL_USER_API ?? 'http://localhost:3000/graphql',
  credentials: 'include',
})



export const userClient = new ApolloClient({
  link: ApolloLink.from([authUserLink, httpUserLink, uploadLink]),
  cache: new InMemoryCache(),
  credentials: 'include',
})
