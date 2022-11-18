import { api } from '../lib/axios'

interface IToken {
  token: string
}

export async function postSignup (username: string, password: string): Promise<IToken> {
  const { data } = await api.post('/auth/signup', { username, password })
  return data
}
