import { api } from '../lib/axios'

interface IUser {
  username: string
  id: string
  accountId: string
  account: {
    balance: number
  }
}

export async function getUser (jwt: string): Promise<IUser> {
  const { data } = await api.post('/auth/me', {}, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
  return data
}
