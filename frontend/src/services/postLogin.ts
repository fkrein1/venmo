import { api } from '../lib/axios'

interface IToken {
  token: string
}

export async function postLogin (username: string, password: string): Promise<IToken> {
  const { data } = await api.post('/auth/login', { username, password })
  return data
}
