import { api } from '../lib/axios'

interface ILogin {
  token: string
}

export async function postLogin (username: string, password: string): Promise<ILogin> {
  const { data } = await api.post('/login', { username, password })
  return data
}
