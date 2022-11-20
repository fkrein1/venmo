import { useMutation } from '@tanstack/react-query'

import { api } from '../lib/axios'

interface IToken {
  token: string
}

interface ILogin {
  username: string
  password: string
}

export async function postLogin ({ username, password }: ILogin): Promise<IToken> {
  const { data } = await api.post('/auth/login', { username, password })
  return data
}

export function useLogin () {
  return useMutation<IToken, unknown, ILogin>({ mutationFn: newLogin => postLogin(newLogin) })
}
