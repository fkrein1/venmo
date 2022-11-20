import { useQuery } from '@tanstack/react-query'
import { getAuthToken } from '../helpers/authToken'
import { api } from '../lib/axios'

interface IUser {
  username: string
  id: string
  accountId: string
  account: {
    balance: number
  }
}

async function getUser (jwt: string): Promise<IUser> {
  const { data } = await api.get(
    '/auth/me',
    {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }
  )
  return data
}

export function useUser () {
  const token = getAuthToken() || 'invalidtoken'
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(token),
    retry: 0
  })
}
