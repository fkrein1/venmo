import { useMutation } from '@tanstack/react-query'

import { api } from '../lib/axios'

interface IToken {
  token: string
}

interface ISignup {
  username: string
  password: string
}

export async function postSignup ({ username, password }: ISignup): Promise<IToken> {
  const { data } = await api.post('/auth/signup', { username, password })
  return data
}

export function useSignup () {
  return useMutation<IToken, unknown, ISignup>({ mutationFn: newSignup => postSignup(newSignup) })
}
